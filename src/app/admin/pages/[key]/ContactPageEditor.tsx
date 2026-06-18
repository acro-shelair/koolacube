"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactStored } from "@/lib/content/simple";
import { savePageContent, resetPageContent } from "../actions";
import type { ContactFormConfig } from "@/lib/content/contact-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StringList } from "@/components/admin/fields";
import { Toggle } from "@/components/ui/modal";
import { Check } from "lucide-react";

export default function ContactPageEditor({
  path,
  initial,
}: {
  path: string;
  initial: ContactStored;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ContactStored>(initial);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof ContactStored>(key: K, value: ContactStored[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }
  function setCfg(value: ContactFormConfig) {
    setForm((prev) => ({ ...prev, form: value }));
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
      <p className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        Phone, email and address shown on this page come from{" "}
        <strong className="text-foreground">Settings</strong>.
      </p>

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
        </div>
      </Section>

      <Section title="Sidebar">
        <div className="space-y-4">
          <Field label="Direct contact heading">
            <Input
              value={form.directContactTitle}
              onChange={(e) => set("directContactTitle", e.target.value)}
            />
          </Field>
          <Field label="Service area heading">
            <Input
              value={form.serviceAreaTitle}
              onChange={(e) => set("serviceAreaTitle", e.target.value)}
            />
          </Field>
          <Field label="Service area text">
            <Textarea
              rows={3}
              value={form.serviceAreaText}
              onChange={(e) => set("serviceAreaText", e.target.value)}
            />
          </Field>
        </div>
      </Section>

      <FormConfig value={form.form} onChange={setCfg} />

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

function FormConfig({
  value,
  onChange,
}: {
  value: ContactFormConfig;
  onChange: (v: ContactFormConfig) => void;
}) {
  const set = <K extends keyof ContactFormConfig>(key: K, v: ContactFormConfig[K]) =>
    onChange({ ...value, [key]: v });

  const setOptional = (
    key: string,
    patch: Partial<ContactFormConfig["optionalFields"][number]>
  ) =>
    onChange({
      ...value,
      optionalFields: value.optionalFields.map((f) =>
        f.key === key ? { ...f, ...patch } : f
      ),
    });

  return (
    <Section title="Enquiry form">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name label">
            <Input value={value.nameLabel} onChange={(e) => set("nameLabel", e.target.value)} />
          </Field>
          <Field label="Phone label">
            <Input value={value.phoneLabel} onChange={(e) => set("phoneLabel", e.target.value)} />
          </Field>
          <Field label="Email label">
            <Input value={value.emailLabel} onChange={(e) => set("emailLabel", e.target.value)} />
          </Field>
          <Field label="Suburb / location label">
            <Input value={value.suburbLabel} onChange={(e) => set("suburbLabel", e.target.value)} />
          </Field>
        </div>

        <Field label="'Need' dropdown label">
          <Input value={value.needLabel} onChange={(e) => set("needLabel", e.target.value)} />
        </Field>
        <StringList
          label="'Need' options"
          items={value.needOptions}
          onChange={(v) => set("needOptions", v)}
          placeholder="e.g. Cold Room"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Hire/Buy legend">
            <Input value={value.modeLegend} onChange={(e) => set("modeLegend", e.target.value)} />
          </Field>
        </div>
        <StringList
          label="Hire/Buy options"
          items={value.modeOptions}
          onChange={(v) => set("modeOptions", v)}
          placeholder="e.g. Hire"
        />

        <div className="space-y-1.5">
          <Label>Optional fields — show &amp; require</Label>
          <div className="space-y-2">
            {value.optionalFields.map((f) => (
              <div
                key={f.key}
                className="flex flex-wrap items-center gap-3 rounded-lg border border-border p-3"
              >
                <Input
                  className="min-w-[12rem] flex-1"
                  value={f.label}
                  onChange={(e) => setOptional(f.key, { label: e.target.value })}
                />
                <label className="flex items-center gap-2 text-sm">
                  <Toggle
                    checked={f.visible}
                    onChange={(v) => setOptional(f.key, { visible: v })}
                  />
                  Show
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Toggle
                    checked={f.required}
                    onChange={(v) => setOptional(f.key, { required: v })}
                  />
                  Required
                </label>
              </div>
            ))}
          </div>
        </div>

        <Field label="Site access legend">
          <Input value={value.accessLegend} onChange={(e) => set("accessLegend", e.target.value)} />
        </Field>
        <StringList
          label="Site access options"
          items={value.accessOptions}
          onChange={(v) => set("accessOptions", v)}
          placeholder="e.g. Forklift"
        />

        <Field label="Acknowledgement text (leave blank to hide)">
          <Textarea
            rows={2}
            value={value.acknowledgeText}
            onChange={(e) => set("acknowledgeText", e.target.value)}
          />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <Toggle
            checked={value.acknowledgeRequired}
            onChange={(v) => set("acknowledgeRequired", v)}
          />
          Acknowledgement required to submit
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Submit button label">
            <Input value={value.submitLabel} onChange={(e) => set("submitLabel", e.target.value)} />
          </Field>
          <Field label="Success heading">
            <Input
              value={value.successHeading}
              onChange={(e) => set("successHeading", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Success message">
          <Textarea
            rows={2}
            value={value.successText}
            onChange={(e) => set("successText", e.target.value)}
          />
        </Field>
      </div>
    </Section>
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
