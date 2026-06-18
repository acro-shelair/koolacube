"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/supabase/logging";

export async function savePageContent(
  path: string,
  data: Record<string, unknown>
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("page_content")
    .upsert({ path, data, updated_at: new Date().toISOString() }, { onConflict: "path" });
  if (error) return { error: error.message };

  await logActivity("update", "page_content", `Edited page ${path}`, path);
  revalidatePath(path);
  revalidatePath("/admin/pages");
  return {};
}

export async function resetPageContent(path: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("page_content").delete().eq("path", path);
  if (error) return { error: error.message };

  await logActivity("delete", "page_content", `Reset page ${path} to default`, path);
  revalidatePath(path);
  revalidatePath("/admin/pages");
  return {};
}
