import { NextResponse } from "next/server";
import { Resend } from "resend";

import { checkRateLimitAsync } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validations/contact";

const MAX_PAYLOAD_BYTES = 32 * 1024; // 32 KB

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizeHeaderValue(value: string): string {
  // Strip newline/carriage return characters to prevent email header injection
  return value.replace(/[\r\n]/g, " ").trim();
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    // Turnstile not configured; bypass verification
    return true;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) return false;
    const data = (await response.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    // If Cloudflare is temporarily unreachable and secret is configured, deny to protect against bot flood
    return false;
  }
}

export async function POST(request: Request) {
  // 1. Verify content type
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { success: false, ok: false, error: "Unsupported Media Type. Request body must be JSON." },
      { status: 415 }
    );
  }

  // 2. Verify payload size limit
  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader && Number.parseInt(contentLengthHeader, 10) > MAX_PAYLOAD_BYTES) {
    return NextResponse.json(
      { success: false, ok: false, error: "Payload too large. Maximum allowed size is 32KB." },
      { status: 413 }
    );
  }

  // 3. Client IP and rate limit verification
  const ip = getClientIp(request);
  const rateLimit = await checkRateLimitAsync(`contact:${ip}`);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, ok: false, error: "Too many messages sent. Please wait a few minutes before trying again." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      }
    );
  }

  // 4. Parse JSON body
  let body: unknown;
  try {
    const rawText = await request.text();
    if (rawText.length > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { success: false, ok: false, error: "Payload too large. Maximum allowed size is 32KB." },
        { status: 413 }
      );
    }
    body = JSON.parse(rawText);
  } catch {
    return NextResponse.json(
      { success: false, ok: false, error: "Invalid JSON request payload." },
      { status: 400 }
    );
  }

  // 5. Honeypot check: silently acknowledge bot submissions without triggering delivery
  if (typeof body === "object" && body !== null && "website" in body) {
    const rawWebsite = (body as { website?: unknown }).website;
    if (typeof rawWebsite === "string" && rawWebsite.trim().length > 0) {
      return NextResponse.json({
        success: true,
        ok: true,
        message: "Thank you for getting in touch. Your message has been received.",
      });
    }
  }

  // 6. Schema validation
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        ok: false,
        error: "Please review the highlighted fields and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, company, purpose, message, turnstileToken } = parsed.data;

  // 7. Optional Turnstile verification
  if (process.env.TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) {
      return NextResponse.json(
        { error: "Security verification required. Please complete the captcha check." },
        { status: 403 }
      );
    }
    const isValid = await verifyTurnstileToken(turnstileToken, ip);
    if (!isValid) {
      return NextResponse.json(
        { error: "Security check failed. Please refresh and try again." },
        { status: 403 }
      );
    }
  }

  // 8. Sanitize header fields against header injection
  const sanitizedName = sanitizeHeaderValue(name);
  const sanitizedEmail = sanitizeHeaderValue(email);
  const sanitizedCompany = company ? sanitizeHeaderValue(company) : undefined;
  const sanitizedPurpose = sanitizeHeaderValue(purpose);
  const submittedAt = new Date().toISOString();

  // 9. Environment variable verification
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      {
        success: false,
        ok: false,
        error: "Contact email delivery is not configured in this environment yet.",
      },
      { status: 503 }
    );
  }

  // 10. Server-side email delivery via Resend with HTML and plain-text fallback
  try {
    const resend = new Resend(apiKey);

    const textAlternative = [
      "=== New Portfolio Contact Enquiry ===",
      `Submission Timestamp (UTC): ${submittedAt}`,
      `From: ${sanitizedName} <${sanitizedEmail}>`,
      sanitizedCompany ? `Company: ${sanitizedCompany}` : null,
      `Purpose: ${sanitizedPurpose}`,
      "",
      "Message:",
      message.trim(),
    ]
      .filter(Boolean)
      .join("\n");

    const htmlContent = [
      `<h2>New Portfolio Contact Enquiry</h2>`,
      `<p><strong>Timestamp (UTC):</strong> ${escapeHtml(submittedAt)}</p>`,
      `<p><strong>Name:</strong> ${escapeHtml(sanitizedName)}</p>`,
      `<p><strong>Email:</strong> ${escapeHtml(sanitizedEmail)}</p>`,
      sanitizedCompany ? `<p><strong>Company:</strong> ${escapeHtml(sanitizedCompany)}</p>` : "",
      `<p><strong>Purpose:</strong> ${escapeHtml(sanitizedPurpose)}</p>`,
      `<p><strong>Message:</strong></p>`,
      `<blockquote style="border-left: 3px solid #818CF8; padding-left: 12px; margin: 12px 0;">`,
      `<p>${escapeHtml(message.trim()).replaceAll("\n", "<br />")}</p>`,
      `</blockquote>`,
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: sanitizedEmail,
      subject: `[Portfolio V2] ${sanitizedPurpose} | ${sanitizedName}`,
      text: textAlternative,
      html: htmlContent,
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          ok: false,
          error: "Unable to deliver your message right now. Please try emailing directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      ok: true,
      message: "Thank you for getting in touch. Your message has been sent successfully.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        ok: false,
        error: "Unexpected error while delivering your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
