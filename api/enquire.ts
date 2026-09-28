import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

// Self-contained on purpose: this function is bundled independently of the
// Vite app (different tsconfig, different runtime — Node on Vercel, not the
// browser), so it duplicates the small amount of validation logic in
// src/utils/contact.ts rather than reaching across that boundary. Server-side
// validation should stand on its own anyway — the client can't be trusted.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function isEmail(value: string): boolean {
  const v = value.trim();
  return v.length <= 254 && EMAIL_RE.test(v) && !v.includes("..");
}
function isPhone(value: string): boolean {
  const digits = value.trim().replace(/[\s().-]/g, "");
  return /^\+?\d{8,15}$/.test(digits) && !/^\+?(\d)\1+$/.test(digits);
}

const BUSINESS_EMAIL = "kookoofoods.au@gmail.com";
const BUSINESS_PHONE = "+61 477 489 613";
// No custom domain is verified with Resend yet, so mail goes out from
// Resend's own shared sending domain for now. Once a domain is added and
// verified in the Resend dashboard, set RESEND_FROM_EMAIL (e.g.
// "Kookoo Foods <enquiries@kookoofoods.com.au>") and this picks it up with
// no code change.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Kookoo Foods <onboarding@resend.dev>";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface EnquiryBody {
  name?: unknown;
  contact?: unknown;
  occasion?: unknown;
  guests?: unknown;
  date?: unknown;
  notes?: unknown;
  dishes?: unknown;
  website?: unknown; // honeypot — real visitors never see or fill this field
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "method_not_allowed" });
  }

  const body = (req.body ?? {}) as EnquiryBody;

  // Honeypot: bots that auto-fill every field on a form will fill this one
  // too, since it looks like a normal field to anything not rendering CSS.
  // Report success without sending anything, so the bot has no signal that
  // it was caught and no reason to adapt.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return res.status(200).json({ success: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const contact = typeof body.contact === "string" ? body.contact.trim() : "";
  const occasion = typeof body.occasion === "string" ? body.occasion.trim() : "";
  const date = typeof body.date === "string" ? body.date.trim() : "";
  const notes = typeof body.notes === "string" ? body.notes.trim() : "";
  const guestsNum = Number(body.guests);
  const dishes = Array.isArray(body.dishes) ? body.dishes.filter((d): d is string => typeof d === "string") : [];

  const invalidFields: string[] = [];
  if (!name) invalidFields.push("name");
  const contactValid = !!contact && (isEmail(contact) || isPhone(contact));
  if (!contactValid) invalidFields.push("contact");
  if (!body.guests || !Number.isFinite(guestsNum) || guestsNum < 10) invalidFields.push("guests");

  if (invalidFields.length) {
    return res.status(400).json({ success: false, error: "invalid_fields", fields: invalidFields });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Fails loudly in logs but not to the visitor beyond "something went
    // wrong" — an un-set API key is a deploy-config problem, not theirs.
    console.error("enquire: RESEND_API_KEY is not set");
    return res.status(500).json({ success: false, error: "server_not_configured" });
  }
  const resend = new Resend(apiKey);

  const firstName = name.split(" ")[0];
  const contactIsEmail = isEmail(contact);

  const dishListHtml = dishes.length
    ? `<p><strong>Dishes they'd like on the table:</strong></p><ul>${dishes.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}</ul>`
    : "";

  const businessHtml = `
    <h2>New catering enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Contact:</strong> ${escapeHtml(contact)}</p>
    <p><strong>Occasion:</strong> ${escapeHtml(occasion || "Not specified")}</p>
    <p><strong>Guests:</strong> ${guestsNum}</p>
    <p><strong>Date:</strong> ${escapeHtml(date || "Flexible")}</p>
    ${dishListHtml}
    ${notes ? `<p><strong>Notes:</strong><br>${escapeHtml(notes).replace(/\n/g, "<br>")}</p>` : ""}
  `;

  const customerHtml = `
    <p>Hi ${escapeHtml(firstName)},</p>
    <p>Thanks for reaching out to Kookoo Foods! We've received your enquiry
    for <strong>${guestsNum} guests</strong>${occasion ? ` (${escapeHtml(occasion)})` : ""}
    and we'll come back to you with a spread and a price, usually the same day.</p>
    ${dishListHtml ? `<p>Here's what you told us you liked the look of:</p>${dishListHtml}` : ""}
    <p>Need to reach us sooner? Call us on ${BUSINESS_PHONE}, or just reply to this email.</p>
    <p>— Kookoo Foods</p>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: BUSINESS_EMAIL,
      replyTo: contactIsEmail ? contact : undefined,
      subject: `Catering enquiry — ${occasion || "Event"} — ${name}`,
      html: businessHtml,
    });

    if (contactIsEmail) {
      // A failed confirmation email shouldn't fail the whole enquiry — the
      // business copy above already landed, which is what actually matters.
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: contact,
          subject: `We've got your enquiry, ${firstName}!`,
          html: customerHtml,
        });
      } catch (confirmErr) {
        console.error("enquire: customer confirmation email failed", confirmErr);
      }
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("enquire: sending to business failed", err);
    return res.status(502).json({ success: false, error: "send_failed" });
  }
}
