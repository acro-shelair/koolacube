"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AboutStored } from "@/lib/content/simple";
import { savePageContent, resetPageContent } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StringList, IconPicker } from "@/components/admin/fields";
import { Plus, Trash2, Check } from "lucide-react";

export default function AboutPageEditor({
  path,
  initial,
}: {
  path: string;
  initial: AboutStored;
}) {
  const router = useRouter();
  const [form, setForm] = useState<AboutStored>(initial);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof AboutStored>(key: K, value: AboutStored[K]) {
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
    if (!confirm("Reset this page to the built-in default copy?")) return;
    setResetting(true);
    const res = await resetPageContent(path);
    setResetting(false);
    if (res.error) return setError(res.error);
    router.refresh();
    router.push("/admin/pages");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Section title="Hero">
        <div className="space-y-4">
          <Field label="Eyebrow">
            <Input value={form.eyebrow} onChange={(e) => set("eyebrow", e.target.value)} />
          </Field>
          <Field label="Breadcrumb">
            <Input value={form.crumb} onChange={(e) => set("crumb", e.target.value)} />
          </Field>
          <Field label="Title (H1)">
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
          </Field>
          <Field label="Intro">
            <Textarea rows={3} value={form.intro} onChange={(e) => set("intro", e.target.value)} />
          </Field>
          <StringList
            label="Intro paragraphs"
            items={form.introParagraphs}
            onChange={(v) => set("introParagraphs", v)}
            placeholder="A paragraph…"
            multiline
          />
        </div>
      </Section>

      <Section title="HVACR Group section">
        <div className="space-y-4">
          <Field label="Eyebrow">
            <Input value={form.groupEyebrow} onChange={(e) => set("groupEyebrow", e.target.value)} />
          </Field>
          <Field label="Heading">
            <Input value={form.groupHeading} onChange={(e) => set("groupHeading", e.target.value)} />
          </Field>
          <Field label="Intro">
            <Textarea rows={3} value={form.groupIntro} onChange={(e) => set("groupIntro", e.target.value)} />
          </Field>
          <PartnerList items={form.partners} onChange={(v) => set("partners", v)} />
        </div>
      </Section>

      <Section title="Compliance section">
        <div className="space-y-4">
          <Field label="Eyebrow">
            <Input value={form.complianceEyebrow} onChange={(e) => set("complianceEyebrow", e.target.value)} />
          </Field>
          <Field label="Heading">
            <Input value={form.complianceHeading} onChange={(e) => set("complianceHeading", e.target.value)} />
          </Field>
          <Field label="Intro">
            <Textarea rows={3} value={form.complianceIntro} onChange={(e) => set("complianceIntro", e.target.value)} />
          </Field>
          <IconLabelList
            label="Compliance items"
            items={form.compliance}
            onChange={(v) => set("compliance", v)}
            field="label"
            placeholder="e.g. Food-safe, HACCP-ready interiors"
          />
        </div>
      </Section>

      <Section title="Local support section">
        <div className="space-y-4">
          <Field label="Eyebrow">
            <Input value={form.supportEyebrow} onChange={(e) => set("supportEyebrow", e.target.value)} />
          </Field>
          <Field label="Heading">
            <Input value={form.supportHeading} onChange={(e) => set("supportHeading", e.target.value)} />
          </Field>
          <IconLabelList
            label="Support items"
            items={form.support}
            onChange={(v) => set("support", v)}
            field="title"
            placeholder="e.g. Fast delivery & onsite setup"
          />
        </div>
      </Section>

      <Section title="Mission & promise">
        <div className="space-y-4">
          <Field label="Mission label">
            <Input value={form.missionLabel} onChange={(e) => set("missionLabel", e.target.value)} />
          </Field>
          <Field label="Mission text">
            <Textarea rows={3} value={form.missionText} onChange={(e) => set("missionText", e.target.value)} />
          </Field>
          <Field label="Promise label">
            <Input value={form.promiseLabel} onChange={(e) => set("promiseLabel", e.target.value)} />
          </Field>
          <Field label="Promise text">
            <Textarea rows={2} value={form.promiseText} onChange={(e) => set("promiseText", e.target.value)} />
          </Field>
          <Field label="Promise tagline">
            <Input value={form.promiseTagline} onChange={(e) => set("promiseTagline", e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section title="SEO">
        <div className="space-y-4">
          <Field label="Meta title">
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

function PartnerList({
  items,
  onChange,
}: {
  items: AboutStored["partners"];
  onChange: (items: AboutStored["partners"]) => void;
}) {
  const set = (i: number, patch: Partial<AboutStored["partners"][number]>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">Partner cards</label>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Card {i + 1}
              </span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                title="Remove"
              >
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </div>
            <Input value={it.kicker} onChange={(e) => set(i, { kicker: e.target.value })} placeholder="Kicker" />
            <Input value={it.name} onChange={(e) => set(i, { name: e.target.value })} placeholder="Name" />
            <Textarea rows={2} value={it.body} onChange={(e) => set(i, { body: e.target.value })} placeholder="Body" />
            <Input value={it.linkLabel} onChange={(e) => set(i, { linkLabel: e.target.value })} placeholder="Link label" />
            <Input value={it.linkUrl} onChange={(e) => set(i, { linkUrl: e.target.value })} placeholder="Link URL" />
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => onChange([...items, { kicker: "", name: "", body: "", linkLabel: "", linkUrl: "" }])}
      >
        <Plus className="h-3.5 w-3.5" /> Add partner
      </Button>
    </div>
  );
}

/** List of { icon, [field] } rows used by compliance (label) and support (title). */
function IconLabelList<F extends string>({
  label,
  items,
  onChange,
  field,
  placeholder,
}: {
  label: string;
  items: ({ icon: string } & Record<F, string>)[];
  onChange: (items: ({ icon: string } & Record<F, string>)[]) => void;
  field: F;
  placeholder: string;
}) {
  const set = (i: number, patch: Partial<{ icon: string } & Record<F, string>>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-2 rounded-lg border border-border p-3">
            <IconPicker value={it.icon} onChange={(icon) => set(i, { icon } as Partial<{ icon: string } & Record<F, string>>)} />
            <Input
              value={it[field]}
              onChange={(e) => set(i, { [field]: e.target.value } as Partial<{ icon: string } & Record<F, string>>)}
              placeholder={placeholder}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              title="Remove"
            >
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() =>
          onChange([...items, { icon: "Check", [field]: "" } as { icon: string } & Record<F, string>])
        }
      >
        <Plus className="h-3.5 w-3.5" /> Add
      </Button>
    </div>
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
