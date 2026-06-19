import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Newspaper } from "lucide-react";
import { getRecentPosts, getPostsLinkingTo } from "@/lib/posts";

/**
 * A "from the blog" strip of post cards. Drop onto the home page or any hub
 * page. Pass `linkingTo` to prefer posts whose related_links point at that path
 * (falls back to the most recent posts). Renders nothing when there are none.
 */
export async function BlogStrip({
  heading = "From the Blog",
  intro,
  linkingTo,
  limit = 3,
  tone = "light",
}: {
  heading?: string;
  intro?: string;
  linkingTo?: string;
  limit?: number;
  tone?: "light" | "muted";
}) {
  const posts = linkingTo
    ? await getPostsLinkingTo(linkingTo, limit)
    : await getRecentPosts(limit);

  if (posts.length === 0) return null;

  return (
    <section className={tone === "muted" ? "bg-muted/40 py-16 md:py-20" : "bg-white py-16 md:py-20"}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-orange">
              Insights
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight md:text-3xl">
              {heading}
            </h2>
            {intro && (
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                {intro}
              </p>
            )}
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cold-blue transition hover:text-cold-blue/80"
          >
            View all articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:border-cold-blue hover:shadow-md"
            >
              {post.cover_image ? (
                <div className="relative h-40 w-full">
                  <Image
                    src={post.cover_image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-40 w-full items-center justify-center bg-cold-blue/5 text-cold-blue/40">
                  <Newspaper className="h-9 w-9" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest">
                  {post.category && <span className="text-cold-blue">{post.category}</span>}
                  {post.date && <span className="text-muted-foreground">{post.date}</span>}
                </div>
                <h3 className="mt-2.5 font-display text-base font-bold leading-snug text-foreground group-hover:text-cold-blue">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between pt-1 text-sm">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-cold-blue">
                    Read more <ArrowRight className="h-4 w-4" />
                  </span>
                  {post.read_time && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {post.read_time}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
