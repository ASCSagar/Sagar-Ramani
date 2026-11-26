interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const DEFAULT_WINDOW_MS = 10 * 60 * 1000;
const DEFAULT_MAX_REQUESTS = 5;

const store = new Map<string, RateLimitEntry>();

// Prune expired entries periodically to prevent memory accumulation
function pruneExpiredEntries(now: number) {
  if (store.size > 1000) {
    for (const [key, entry] of store.entries()) {
      if (now >= entry.resetAt) {
        store.delete(key);
      }
    }
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function checkRateLimit(
  key: string,
  options?: { windowMs?: number; maxRequests?: number; now?: number }
): RateLimitResult {
  const windowMs = options?.windowMs ?? DEFAULT_WINDOW_MS;
  const maxRequests = options?.maxRequests ?? DEFAULT_MAX_REQUESTS;
  const now = options?.now ?? Date.now();

  pruneExpiredEntries(now);

  const existing = store.get(key);

  if (!existing || now >= existing.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: Math.max(0, maxRequests - 1),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  store.set(key, existing);

  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - existing.count),
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

/**
 * Async rate limiter supporting distributed durable storage via Upstash Redis REST API
 * when configured (UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN),
 * falling back gracefully to the in-memory sliding window when unconfigured or unreachable.
 */
export async function checkRateLimitAsync(
  key: string,
  options?: { windowMs?: number; maxRequests?: number; now?: number }
): Promise<RateLimitResult> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    try {
      const windowSeconds = Math.ceil((options?.windowMs ?? DEFAULT_WINDOW_MS) / 1000);
      const maxRequests = options?.maxRequests ?? DEFAULT_MAX_REQUESTS;
      const sanitizedKey = `ratelimit:${key.replace(/[^a-zA-Z0-9_:-]/g, "_")}`;

      // Pipeline INCR and TTL using Upstash Redis REST API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);

      const response = await fetch(`${redisUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${redisToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", sanitizedKey],
          ["TTL", sanitizedKey],
        ]),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const results = (await response.json()) as Array<{ result: number }>;
        const count = results[0]?.result ?? 1;
        let ttl = results[1]?.result ?? -1;

        // If key is newly created (TTL was -1), set the expiration window
        if (ttl === -1 || count === 1) {
          fetch(`${redisUrl}/expire/${sanitizedKey}/${windowSeconds}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${redisToken}` },
          }).catch(() => {});
          ttl = windowSeconds;
        }

        const retryAfter = Math.max(1, ttl > 0 ? ttl : windowSeconds);

        if (count > maxRequests) {
          return {
            allowed: false,
            remaining: 0,
            retryAfterSeconds: retryAfter,
          };
        }

        return {
          allowed: true,
          remaining: Math.max(0, maxRequests - count),
          retryAfterSeconds: retryAfter,
        };
      }
    } catch {
      // Graceful fallback to in-memory on network/timeout error
    }
  }

  return checkRateLimit(key, options);
}

export function resetRateLimitStore(): void {
  store.clear();
}
