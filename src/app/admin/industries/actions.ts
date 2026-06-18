"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/supabase/logging";
import type { Industry } from "@/lib/industries";

export type IndustryInput = {
  slug: string;
  icon: string;
  name: string;
  tagline: string;
  intro: string;
  challenges: string[];
  helps: string[];
  is_published: boolean;
};

function revalidate() {
  revalidatePath("/admin/industries");
  revalidatePath("/industries");
}

export async function createIndustry(input: IndustryInput) {
  const supabase = await createClient();
  const { data: last } = await supabase
    .from("industries")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .single();
  const display_order = last ? last.display_order + 1 : 0;

  const { data, error } = await supabase
    .from("industries")
    .insert({ ...input, display_order })
    .select("*")
    .single();
  if (error) return { error: error.message };
  await logActivity("create", "industries", `Created industry: ${input.name}`, data.id);
  revalidate();
  return { industry: data as Industry };
}

export async function updateIndustry(id: string, input: IndustryInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("industries").update(input).eq("id", id);
  if (error) return { error: error.message };
  await logActivity("update", "industries", `Updated industry: ${input.name}`, id);
  revalidate();
  return {};
}

export async function deleteIndustry(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("industries").delete().eq("id", id);
  if (error) return { error: error.message };
  await logActivity("delete", "industries", `Deleted industry ${id}`, id);
  revalidate();
  return {};
}

export async function toggleIndustryPublished(id: string, is_published: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("industries")
    .update({ is_published })
    .eq("id", id);
  if (error) return { error: error.message };
  await logActivity("update", "industries", `Industry ${id} published=${is_published}`, id);
  revalidate();
  return {};
}
