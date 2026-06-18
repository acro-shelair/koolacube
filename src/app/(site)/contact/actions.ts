"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { logActivity } from "@/lib/supabase/logging";

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
    return {};
  } catch {
    return { error: "Could not send your enquiry. Please call us." };
  }
}
