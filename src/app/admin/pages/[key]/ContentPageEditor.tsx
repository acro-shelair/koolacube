"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ContentPageData } from "@/lib/content/registry";
import { savePageContent, resetPageContent } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StringList } from "@/components/admin/fields";
import { Check } from "lucide-react";

export default function ContentPageEditor({
  path,
  initial,
}: {
  path: string;
  initial: ContentPageData;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ContentPageData>(initial);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof ContentPageData>(key: K, value: ContentPageData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await savePageContent(path, { ...form });
    setSaving(false);
    if (res.error) return setError(res.error);
    setSaved(true);
    router.refresh();
  }

  async function onReset() {
    if (!confirm("Reset this page to the built-in default copy? Your edits will be removed."))
      return;
    setResetting(true);
    const res = await resetPageContent(path);
    setResetting(false);
    if (res.error) return setError(res.error);
    router.refresh();
    router.push("/admin/pages");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Section title="Page content">
        <div className="space-y-4">
          <Field label="Eyebrow (small label above the title)">
            <Input value={form.eyebrow} onChange={(e) => set("eyebrow", e.target.value)} />
          </Field>
          <Field label="Breadcrumb">
            <Input value={form.crumb} onChange={(e) => set("crumb", e.target.value)} />
          </Field>
          <Field label="Title (H1)">
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
          </Field>
          <Field label="Intro paragraph">
            <Textarea rows={3} value={form.intro} onChange={(e) => set("intro", e.target.value)} />
          </Field>
          <StringList
            label="Bullet points"
            items={form.bullets}
            onChange={(bullets) => set("bullets", bullets)}
            placeholder="e.g. Monthly hire"
          />
        </div>
      </Section>

      <Section title="SEO">
        <div className="space-y-4">
          <Field label="Meta title (browser tab & search results)">
            <Input value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} />
          </Field>
          <Field label="Meta description">
            <Textarea
              rows={2}
              value={form.metaDescription}
              onChange={(e) => set("metaDescription", e.target.value)}
            />
          </Field>
        </div>
      </Section>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
        <Button type="button" variant="outline" onClick={onReset} disabled={resetting}>
          {resetting ? "Resetting…" : "Reset to default"}
        </Button>
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-green-600">
            <Check className="h-4 w-4" /> Saved
          </span>
        )}
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
