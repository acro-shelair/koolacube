import { createClient } from "@/lib/supabase/server";

/**
 * Read a page's content: the DB override (page_content.data) shallow-merged over
 * the in-code defaults. Never throws — falls back to defaults if the row is
 * missing or the table/keys aren't ready. Shallow merge is intentional: each
 * template's data is a flat object (arrays are replaced wholesale).
 */
export async function getPageContent<T extends object>(
  path: string,
  defaults: T
): Promise<T> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("data")
      .eq("path", path)
      .single();

    if (error || !data?.data) return defaults;
    return { ...defaults, ...(data.data as Partial<T>) };
  } catch {
    return defaults;
  }
}

/** All saved page_content rows as a path -> data map (for the admin list). */
export async function getAllPageOverrides(): Promise<Record<string, unknown>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("path, data");
    if (error || !data) return {};
    return Object.fromEntries(data.map((r) => [r.path, r.data]));
  } catch {
    return {};
  }
}
