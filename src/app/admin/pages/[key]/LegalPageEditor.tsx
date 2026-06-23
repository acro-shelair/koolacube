"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LegalPageData, LegalSection } from "@/lib/content/registry";
import { savePageContent, resetPageContent } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, Plus, Trash2, GripVertical } from "lucide-react";

export default function LegalPageEditor({
  path,
  initial,
}: {
  path: string;
  initial: LegalPageData;
}) {
  const router = useRouter();
  const [form, setForm] = useState<LegalPageData>(initial);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof LegalPageData>(key: K, value: LegalPageData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function setSection(i: number, key: keyof LegalSection, value: string) {
    set(
      "sections",
      form.sections.map((s, idx) => (idx === i ? { ...s, [key]: value } : s))
    );
  }
  function addSection() {
    set("sections", [...form.sections, { heading: "", body: "" }]);
  }
  function removeSection(i: number) {
    set(
      "sections",
      form.sections.filter((_, idx) => idx !== i)
    );
  }
  function moveSection(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= form.sections.length) return;
    const next = [...form.sections];
    [next[i], next[j]] = [next[j], next[i]];
    set("sections", next);
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
      <Section title="Page header">
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
            <Textarea rows={4} value={form.intro} onChange={(e) => set("intro", e.target.value)} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Effective date">
              <Input
                value={form.effectiveDate}
                onChange={(e) => set("effectiveDate", e.target.value)}
                placeholder="1 January 2026"
              />
            </Field>
            <Field label="ABN (optional — leave blank to hide)">
              <Input
                value={form.abn}
                onChange={(e) => set("abn", e.target.value)}
                placeholder="43 672 578 264"
              />
            </Field>
          </div>
        </div>
      </Section>

      <Section title="Sections">
        <p className="mb-4 text-xs text-muted-foreground">
          In the body, leave a blank line between paragraphs — each blank line starts a new
          paragraph on the public page.
        </p>

        <div className="space-y-5">
          {form.sections.map((section, i) => (
            <div key={i} className="rounded-lg border border-border p-4">
              <div className="mb-3 flex items-center gap-2">
                <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                <span className="flex-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Section {i + 1}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2"
                  onClick={() => moveSection(i, -1)}
                  disabled={i === 0}
                  title="Move up"
                >
                  ↑
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2"
                  onClick={() => moveSection(i, 1)}
                  disabled={i === form.sections.length - 1}
                  title="Move down"
                >
                  ↓
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => removeSection(i)}
                  title="Remove section"
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
              <div className="space-y-3">
                <Field label="Heading">
                  <Input
                    value={section.heading}
                    onChange={(e) => setSection(i, "heading", e.target.value)}
                    placeholder="1. Definitions"
                  />
                </Field>
                <Field label="Body">
                  <Textarea
                    rows={6}
                    className="font-mono text-sm"
                    value={section.body}
                    onChange={(e) => setSection(i, "body", e.target.value)}
                    placeholder="Section content… Leave a blank line between paragraphs."
                  />
                </Field>
              </div>
            </div>
          ))}

          {form.sections.length === 0 && (
            <p className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
              No sections yet. Click “Add section” to get started.
            </p>
          )}
        </div>

        <div className="mt-4">
          <Button type="button" size="sm" variant="outline" onClick={addSection}>
            <Plus className="h-3.5 w-3.5" /> Add section
          </Button>
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
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
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
