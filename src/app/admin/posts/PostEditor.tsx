"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createPost, updatePost, type PostInput } from "./actions";
import type { Post } from "@/lib/posts";
import { sectionSchema, type SectionData } from "@/lib/post-blocks";
import { SITE_LINK_SUGGESTIONS, type RelatedLink } from "@/lib/post-links";
import ContentSectionsEditor from "@/components/admin/content-sections";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/modal";
import { Plus, Trash2 } from "lucide-react";

const schema = z.object({
  title: z.string().min(1, "Required"),
  slug: z
    .string()
    .min(1, "Required")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  excerpt: z.string(),
  category: z.string(),
  date: z.string(),
  read_time: z.string(),
  sections: z.array(sectionSchema).min(1, "At least one section is required"),
});

type FormData = z.infer<typeof schema>;

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function PostEditor({ post }: { post?: Post }) {
  const router = useRouter();
  const isEdit = !!post;
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState(post?.cover_image ?? "");
  const [isPublished, setIsPublished] = useState(post?.is_published ?? true);
  const [links, setLinks] = useState<RelatedLink[]>(post?.related_links ?? []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      excerpt: post?.excerpt ?? "",
      category: post?.category ?? "",
      date: post?.date ?? "",
      read_time: post?.read_time ?? "",
      sections:
        (post?.body as SectionData[] | undefined)?.length
          ? (post!.body as SectionData[])
          : [{ heading: "", blocks: [{ type: "paragraph", text: "" }] }],
    },
  });

  function updateLink(i: number, patch: Partial<RelatedLink>) {
    setLinks((prev) => prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }

  async function onSubmit(data: FormData) {
    setSaving(true);
    setServerError(null);

    const input: PostInput = {
      slug: data.slug.trim(),
      title: data.title.trim(),
      excerpt: data.excerpt.trim(),
      category: data.category.trim(),
      cover_image: coverImage.trim(),
      read_time: data.read_time.trim(),
      date: data.date.trim(),
      body: data.sections as PostInput["body"],
      related_links: links
        .map((l) => ({ label: l.label.trim(), href: l.href.trim() }))
        .filter((l) => l.label && l.href),
      is_published: isPublished,
    };

    const result = isEdit ? await updatePost(post.id, input) : await createPost(input);
    setSaving(false);
    if (result?.error) {
      setServerError(result.error);
      return;
    }
    router.push("/admin/posts");
    router.refresh();
  }

  const sectionsError =
    errors.sections && !Array.isArray(errors.sections) ? errors.sections.message : undefined;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{isEdit ? "Edit Post" : "New Post"}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Build the article with rich content blocks.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save Post"}
          </Button>
        </div>
      </div>

      {serverError && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{serverError}</p>
      )}

      {/* Basic fields */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-1.5 md:col-span-2">
          <Label>Title</Label>
          <Input
            {...register("title")}
            onBlur={(e) => {
              if (!isEdit && !getValues("slug")) setValue("slug", toSlug(e.target.value));
            }}
            placeholder="How to choose the right cold room size"
          />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label>
            Slug{" "}
            <span className="text-xs font-normal text-muted-foreground">(URL — /blog/…)</span>
          </Label>
          <Input {...register("slug")} placeholder="choose-cold-room-size" />
          {errors.slug && <p className="text-xs text-destructive">{errors.slug.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label>
            Category <span className="text-xs font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input {...register("category")} placeholder="Cold Room Hire" />
        </div>

        <div className="space-y-1.5">
          <Label>
            Date <span className="text-xs font-normal text-muted-foreground">e.g. Jun 2026</span>
          </Label>
          <Input {...register("date")} placeholder="Jun 2026" />
        </div>

        <div className="space-y-1.5">
          <Label>
            Read time{" "}
            <span className="text-xs font-normal text-muted-foreground">e.g. 5 min read</span>
          </Label>
          <Input {...register("read_time")} placeholder="5 min read" />
        </div>

        <div className="space-y-1.5 md:col-span-2">
          <Label>
            Excerpt{" "}
            <span className="text-xs font-normal text-muted-foreground">(shown on the card)</span>
          </Label>
          <Textarea {...register("excerpt")} rows={2} className="resize-none" />
        </div>
      </div>

      {/* Cover image */}
      <div className="space-y-2">
        <Label>Cover image</Label>
        <div className="max-w-md">
          <ImageUploader value={coverImage} onChange={setCoverImage} heightClass="h-48" />
        </div>
      </div>

      {/* Content sections */}
      <ContentSectionsEditor
        control={control}
        register={register}
        setValue={setValue}
        error={sectionsError}
      />

      {/* Related internal links */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <Label>Related pages</Label>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Internal links shown at the bottom of the article (industry, hire, buy, units…).
            </p>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setLinks((prev) => [...prev, { label: "", href: "" }])}
          >
            <Plus className="h-3.5 w-3.5" /> Add link
          </Button>
        </div>

        <datalist id="site-link-suggestions">
          {SITE_LINK_SUGGESTIONS.map((s) => (
            <option key={s.href} value={s.href}>
              {s.label}
            </option>
          ))}
        </datalist>

        {links.length > 0 && (
          <div className="space-y-2">
            {links.map((l, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  value={l.label}
                  onChange={(e) => updateLink(i, { label: e.target.value })}
                  placeholder="Link label (e.g. Cold Room Hire)"
                  className="flex-1"
                />
                <Input
                  value={l.href}
                  list="site-link-suggestions"
                  onChange={(e) => {
                    const href = e.target.value;
                    const match = SITE_LINK_SUGGESTIONS.find((s) => s.href === href);
                    updateLink(i, match && !l.label ? { href, label: match.label } : { href });
                  }}
                  placeholder="/hire/cold-room"
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  title="Remove link"
                  onClick={() => setLinks((prev) => prev.filter((_, idx) => idx !== i))}
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Toggle
        checked={isPublished}
        onChange={setIsPublished}
        label={isPublished ? "Published" : "Draft (hidden from site)"}
      />
    </form>
  );
}
