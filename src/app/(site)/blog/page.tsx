import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, CtaStrip } from "@/components/site/PageHero";
import { getPublishedPosts } from "@/lib/posts";
import { ArrowRight, Newspaper, Clock } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog | Koolacube",
  description:
    "Guides, tips and insights on cold room and freezer room hire, sales and refrigeration for commercial operators across South East Queensland.",
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Blog | Koolacube",
    description:
      "Guides, tips and insights on cold room and freezer room hire, sales and refrigeration.",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        crumb="Blog"
        title="Cold Room Insights & Guides"
        intro="Practical advice on hiring, buying and running cold rooms and freezer rooms — written for restaurants, food manufacturers, butchers, aged care and beyond."
      />

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          {posts.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <Newspaper className="mx-auto mb-3 h-10 w-10 opacity-40" />
              <p className="text-sm">No articles yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:border-cold-blue hover:shadow-md"
                >
                  {post.cover_image ? (
                    <div className="relative h-44 w-full">
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-44 w-full items-center justify-center bg-cold-blue/5 text-cold-blue/40">
                      <Newspaper className="h-10 w-10" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest">
                      {post.category && (
                        <span className="text-cold-blue">{post.category}</span>
                      )}
                      {post.date && <span className="text-muted-foreground">{post.date}</span>}
                    </div>
                    <h2 className="mt-3 font-display text-lg font-bold leading-snug text-foreground group-hover:text-cold-blue">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-5 flex items-center justify-between pt-1 text-sm">
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
          )}
        </div>
      </section>

      <CtaStrip />
    </>
  );
}
