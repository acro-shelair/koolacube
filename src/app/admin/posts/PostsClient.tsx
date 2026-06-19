"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updatePost, deletePost } from "./actions";
import type { Post } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Newspaper, Eye, EyeOff } from "lucide-react";

export default function PostsClient({ initialPosts }: { initialPosts: Post[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setLoadingId(id);
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setConfirmDeleteId(null);
    setLoadingId(null);
    router.refresh();
  }

  async function handleTogglePublished(post: Post) {
    setLoadingId(post.id);
    const next = !post.is_published;
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, is_published: next } : p)));
    await updatePost(post.id, { slug: post.slug, is_published: next });
    setLoadingId(null);
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Articles shown at <span className="font-mono">/blog</span>. Newest first.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-accent px-3 text-xs font-medium text-accent-foreground transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          <Newspaper className="mx-auto mb-3 h-10 w-10 opacity-40" />
          <p className="text-sm">No posts yet. Write your first one.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {posts.map((post) => {
            const isConfirming = confirmDeleteId === post.id;
            const isLoading = loadingId === post.id;
            return (
              <div
                key={post.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4"
              >
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="flex min-w-0 flex-1 items-center gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Newspaper className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p
                        className={`truncate text-sm font-semibold ${
                          post.is_published ? "" : "text-muted-foreground"
                        }`}
                      >
                        {post.title}
                      </p>
                      {post.category && (
                        <span className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {post.category}
                        </span>
                      )}
                      {!post.is_published && (
                        <span className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      /{post.slug}
                      {post.excerpt ? ` — ${post.excerpt}` : ""}
                    </p>
                  </div>
                </Link>
                <div className="ml-2 flex shrink-0 items-center gap-1">
                  {isConfirming ? (
                    <>
                      <span className="mr-1 hidden text-xs text-muted-foreground sm:block">
                        Delete?
                      </span>
                      <Button size="sm" variant="ghost" onClick={() => setConfirmDeleteId(null)}>
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(post.id)}
                        disabled={isLoading}
                      >
                        {isLoading ? "…" : "Confirm"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleTogglePublished(post)}
                        disabled={isLoading}
                        title={post.is_published ? "Unpublish" : "Publish"}
                      >
                        {post.is_published ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Link
                        href={`/admin/posts/${post.id}`}
                        title="Edit"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-foreground transition hover:bg-muted"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setConfirmDeleteId(post.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
