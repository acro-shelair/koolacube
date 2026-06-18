"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/supabase/logging";
import type { Unit, UnitCategory, UnitSpec } from "@/lib/units";

export type UnitInput = {
  slug: string;
  category: UnitCategory;
  icon: string;
  name: string;
  tagline: string;
  intro: string;
  img: string;
  specs: UnitSpec[];
  applications: string[];
  is_published: boolean;
};

function revalidate() {
  revalidatePath("/admin/units");
  revalidatePath("/available-units");
}

export async function createUnit(input: UnitInput) {
  const supabase = await createClient();

  const { data: last } = await supabase
    .from("units")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .single();
  const display_order = last ? last.display_order + 1 : 0;

  const { data, error } = await supabase
    .from("units")
    .insert({ ...input, display_order })
    .select("*")
    .single();

  if (error) return { error: error.message };
  await logActivity("create", "units", `Created unit: ${input.name}`, data.id);
  revalidate();
  return { unit: data as Unit };
}

export async function updateUnit(id: string, input: UnitInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("units").update(input).eq("id", id);
  if (error) return { error: error.message };
  await logActivity("update", "units", `Updated unit: ${input.name}`, id);
  revalidate();
  return {};
}

export async function deleteUnit(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("units").delete().eq("id", id);
  if (error) return { error: error.message };
  await logActivity("delete", "units", `Deleted unit ${id}`, id);
  revalidate();
  return {};
}

export async function toggleUnitPublished(id: string, is_published: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("units")
    .update({ is_published })
    .eq("id", id);
  if (error) return { error: error.message };
  await logActivity("update", "units", `Unit ${id} published=${is_published}`, id);
  revalidate();
  return {};
}
