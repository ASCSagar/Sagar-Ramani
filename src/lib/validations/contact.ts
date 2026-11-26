import { z } from "zod";

export const enquiryPurposes = [
  "Project Collaboration",
  "Full-Time Role Discussion",
  "Consulting / Architecture",
  "General Enquiry",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(160, "Email address is too long."),
  company: z
    .string()
    .trim()
    .max(120, "Company name must be 120 characters or fewer.")
    .optional()
    .or(z.literal("")),
  purpose: z.enum(enquiryPurposes, {
    error: "Please select an enquiry purpose.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please include a brief message (at least 10 characters).")
    .max(3000, "Message must be 3000 characters or fewer."),
  // Honeypot field: must remain empty for legitimate submissions
  website: z.string().max(0).optional().or(z.literal("")),
  // Optional Cloudflare Turnstile bot verification token
  turnstileToken: z.string().max(2048).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
