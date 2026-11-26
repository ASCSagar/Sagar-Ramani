import { describe, expect, it } from "vitest";

import { contactSchema, enquiryPurposes } from "@/lib/validations/contact";

describe("contactSchema", () => {
  const validPayload = {
    name: "Jane Doe",
    email: "jane@example.com",
    company: "Acme Corp",
    purpose: enquiryPurposes[0],
    message: "Interested in discussing a full-stack Next.js project.",
    website: "",
  };

  it("accepts a valid contact payload", () => {
    const result = contactSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects short names and invalid email addresses", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      name: "J",
      email: "invalid-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-empty honeypot website values", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      website: "https://spam.example",
    });
    expect(result.success).toBe(false);
  });

  it("rejects messages shorter than 10 characters", () => {
    const result = contactSchema.safeParse({
      ...validPayload,
      message: "Too short",
    });
    expect(result.success).toBe(false);
  });
});
