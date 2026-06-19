"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/supabase/logging";
import type { PostSection } from "@/lib/post-blocks";
import type { RelatedLink } from "@/lib/post-links";

export type PostInput = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_image: string;
  read_time: string;
  date: string;
  body: PostSection[];
  related_links: RelatedLink[];
  is_published: boolean;
};

function revalidate(slug?: string) {
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function createPost(input: PostInput) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .insert(input)
    .select("*")
    .single();

  if (error) return { error: error.message };

  await logActivity("create", "posts", `Created post: ${input.title}`, data.id);
  revalidate(input.slug);
  return { post: data };
}

export async function updatePost(id: string, input: Partial<PostInput>) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) return { error: error.message };

  await logActivity("update", "posts", `Updated post ${id}`, id);
  revalidate(input.slug);
  return { post: data };
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) return { error: error.message };

  await logActivity("delete", "posts", `Deleted post ${id}`, id);
  revalidate();
  return {};
}
