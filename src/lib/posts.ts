import { createClient } from "@/lib/supabase/server";
import { normalizeRelatedLinks, type RelatedLink } from "@/lib/post-links";
import { normalizeBody, type PostSection } from "@/lib/post-blocks";

export type { RelatedLink } from "@/lib/post-links";
export type { PostSection, ContentBlock } from "@/lib/post-blocks";
export { normalizeBody } from "@/lib/post-blocks";

export type Post = {
  id: string;
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
  created_at: string;
  updated_at: string;
};

function hydrate(row: Record<string, unknown>): Post {
  return {
    ...(row as Post),
    body: normalizeBody(row.body),
    related_links: normalizeRelatedLinks(row.related_links),
  };
}

/** Published posts for the public blog, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map(hydrate);
  } catch {
    return [];
  }
}

/** The most recent published posts (for home / hub-page "from the blog" strips). */
export async function getRecentPosts(limit = 3): Promise<Post[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return data.map(hydrate);
  } catch {
    return [];
  }
}

/**
 * Published posts that link to a given internal path via related_links.
 * Lets a destination page (e.g. /industries) surface the articles about it.
 * Falls back to the most recent posts when nothing links to the path yet.
 */
export async function getPostsLinkingTo(href: string, limit = 3): Promise<Post[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .contains("related_links", [{ href }])
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) return [];
    if (!data || data.length === 0) return getRecentPosts(limit);
    return data.map(hydrate);
  } catch {
    return [];
  }
}

/** A single published post by slug, or null if not found / unpublished. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();
    if (error || !data) return null;
    return hydrate(data);
  } catch {
    return null;
  }
}

/** Slugs of all published posts — for related links / static params. */
export async function getPublishedSlugs(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("slug")
      .eq("is_published", true);
    if (error || !data) return [];
    return data.map((r) => r.slug as string);
  } catch {
    return [];
  }
}

/** A single post by id (published or draft) for the admin editor. */
export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
  if (error || !data) return null;
  return hydrate(data);
}

/** Every post (published or draft) for the admin list, newest first. */
export async function getAllPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map(hydrate);
}
