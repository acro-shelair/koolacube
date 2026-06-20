"use server";

import { z } from "zod";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { logActivity } from "@/lib/supabase/logging";
import { getSettings } from "@/lib/settings.server";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  business: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(255),
  suburb: z.string().trim().min(1).max(160),
  // need/mode are admin-configurable, so accept any short string.
  need: z.string().trim().max(80).optional().or(z.literal("")),
  mode: z.string().trim().max(80).optional().or(z.literal("")),
  startDate: z.string().trim().max(60).optional().or(z.literal("")),
  duration: z.string().trim().max(120).optional().or(z.literal("")),
  product: z.string().trim().max(255).optional().or(z.literal("")),
  volume: z.string().trim().max(120).optional().or(z.literal("")),
  power: z.string().trim().max(120).optional().or(z.literal("")),
  access: z.array(z.string().max(40)).max(10).default([]),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type EnquiryInput = z.input<typeof schema>;

export async function submitEnquiry(input: EnquiryInput) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { error: "Please check the form and try again." };
  }
  const d = parsed.data;

  try {
    // Service role: the public can submit without an authenticated session.
    const supabase = createAdminClient();
    const { error } = await supabase.from("messages").insert({
      name: d.name,
      business: d.business || null,
      phone: d.phone,
      email: d.email,
      suburb: d.suburb,
      need: d.need || null,
      mode: d.mode || null,
      start_date: d.startDate || null,
      duration: d.duration || null,
      product: d.product || null,
      volume: d.volume || null,
      power: d.power || null,
      access: d.access,
      message: d.message || null,
      status: "new",
    });

    if (error) return { error: "Could not send your enquiry. Please call us." };

    await logActivity(
      "create",
      "messages",
      `New enquiry from ${d.name} (${d.email})`,
      undefined,
      d.email
    );

    // Notify the business by email. The enquiry is already saved, so a mail
    // failure must never surface to the visitor — log it and move on.
    await sendNotification(d);

    return {};
  } catch {
    return { error: "Could not send your enquiry. Please call us." };
  }
}

type Enquiry = z.infer<typeof schema>;

async function sendNotification(d: Enquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  // Recipient: CONTACT_NOTIFY_EMAIL overrides (e.g. a dedicated enquiries inbox);
  // otherwise use the editable Settings → Contact → Email, which itself falls
  // back to SITE.email when unset.
  const settings = await getSettings();
  const to = process.env.CONTACT_NOTIFY_EMAIL || settings.email;

  if (!apiKey || !from) {
    console.warn(
      "Enquiry email skipped: RESEND_API_KEY or RESEND_FROM_EMAIL not set."
    );
    return;
  }

  const rows: [string, string][] = [
    ["Name", d.name],
    ["Business", d.business || "—"],
    ["Phone", d.phone],
    ["Email", d.email],
    ["Suburb", d.suburb],
    ["Need", d.need || "—"],
    ["Hire / Buy", d.mode || "—"],
    ["Start date", d.startDate || "—"],
    ["Duration", d.duration || "—"],
    ["Product", d.product || "—"],
    ["Volume", d.volume || "—"],
    ["Power", d.power || "—"],
    ["Access", d.access.length ? d.access.join(", ") : "—"],
    ["Message", d.message || "—"],
  ];

  const html = `
    <h2 style="margin:0 0 12px">New Enquiry — ${escapeHtml(d.name)}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:560px;font-family:Arial,sans-serif;font-size:14px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr>
              <td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold;background:#f8fafc;white-space:nowrap">${label}</td>
              <td style="padding:8px;border:1px solid #e5e7eb">${
                label === "Email"
                  ? `<a href="mailto:${escapeHtml(value)}">${escapeHtml(
                      value
                    )}</a>`
                  : escapeHtml(value)
              }</td>
            </tr>`
        )
        .join("")}
    </table>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: d.email,
      subject: `New Enquiry: ${d.mode || "Hire"} — ${d.name}`,
      html,
    });
    if (error) console.error("Resend email error:", error);
  } catch (err) {
    console.error("Resend email exception:", err);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
