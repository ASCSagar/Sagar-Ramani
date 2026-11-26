import { beforeEach, describe, expect, it } from "vitest";

import { checkRateLimit, resetRateLimitStore } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimitStore();
  });

  it("allows requests within the configured window and blocks overflow", () => {
    const now = 1_000_000;
    expect(checkRateLimit("ip:1", { maxRequests: 2, windowMs: 60_000, now }).allowed).toBe(true);
    expect(checkRateLimit("ip:1", { maxRequests: 2, windowMs: 60_000, now }).allowed).toBe(true);

    const blocked = checkRateLimit("ip:1", { maxRequests: 2, windowMs: 60_000, now });
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBe(60);
  });

  it("resets once the window expires", () => {
    const start = 1_000_000;
    checkRateLimit("ip:2", { maxRequests: 1, windowMs: 10_000, now: start });
    expect(checkRateLimit("ip:2", { maxRequests: 1, windowMs: 10_000, now: start + 100 }).allowed).toBe(
      false
    );
    expect(
      checkRateLimit("ip:2", { maxRequests: 1, windowMs: 10_000, now: start + 10_001 }).allowed
    ).toBe(true);
  });
});
