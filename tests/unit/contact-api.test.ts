import { beforeEach, describe, expect, it } from "vitest";

import { POST } from "@/app/api/contact/route";
import { resetRateLimitStore } from "@/lib/rate-limit";

describe("POST /api/contact", () => {
  beforeEach(() => {
    resetRateLimitStore();
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FROM_EMAIL;
    delete process.env.CONTACT_TO_EMAIL;
    delete process.env.TURNSTILE_SECRET_KEY;
  });

  it("rejects non-JSON requests with HTTP 415", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "Hello world",
    });

    const res = await POST(req);
    expect(res.status).toBe(415);
    const data = await res.json();
    expect(data.error).toContain("Unsupported Media Type");
  });

  it("rejects malformed JSON body with HTTP 400", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{ not valid json",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("Invalid JSON");
  });

  it("rejects schema validation failures with HTTP 400 and field errors", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "A", // too short
        email: "not-an-email",
        purpose: "Invalid Purpose",
        message: "Short",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.fieldErrors).toBeDefined();
  });

  it("silently acknowledges honeypot spam submissions with HTTP 200 without email attempt", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Spam Bot",
        email: "bot@spam.example",
        purpose: "General Enquiry",
        message: "Check out our search ranking service here!",
        website: "https://spam.example",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
  });

  it("returns HTTP 503 when Resend environment credentials are unconfigured", async () => {
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Sagar Ramani",
        email: "sagar@example.com",
        purpose: "Project Collaboration",
        message: "I would like to discuss building an enterprise Next.js application.",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.error).toContain("not configured in this environment yet");
  });

  it("enforces rate limits with HTTP 429 when requests exceed threshold", async () => {
    const payload = JSON.stringify({
      name: "Repeated Sender",
      email: "sender@example.com",
      purpose: "General Enquiry",
      message: "Sending repetitive contact messages in quick succession.",
    });

    for (let i = 0; i < 5; i++) {
      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": "203.0.113.195",
        },
        body: payload,
      });
      await POST(req);
    }

    // 6th request from same IP should be blocked
    const blockedReq = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Forwarded-For": "203.0.113.195",
      },
      body: payload,
    });
    const blockedRes = await POST(blockedReq);
    expect(blockedRes.status).toBe(429);
    expect(blockedRes.headers.get("Retry-After")).toBeDefined();
  });
});
