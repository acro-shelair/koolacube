"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSettings } from "./actions";
import type { EffectiveSettings } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";

export default function SettingsClient({
  initial,
}: {
  initial: EffectiveSettings;
}) {
  const router = useRouter();
  const [form, setForm] = useState<EffectiveSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof EffectiveSettings>(key: K, value: EffectiveSettings[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }
  function setAddr(key: keyof EffectiveSettings["address"], value: string) {
    setForm((prev) => ({ ...prev, address: { ...prev.address, [key]: value } }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await updateSettings(form);
    setSaving(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Business details &amp; shared copy used across the site (header, footer,
          structured data and call-to-action strips).
        </p>
      </div>

      <Section title="Contact details">
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrap label="Phone (display)">
            <Input
              value={form.telephone}
              onChange={(e) => set("telephone", e.target.value)}
              placeholder="1300 561 030"
            />
          </FieldWrap>
          <FieldWrap label="Phone (tel: link, e.g. +611300561030)">
            <Input
              value={form.telephoneE164}
              onChange={(e) => set("telephoneE164", e.target.value)}
              placeholder="1300561030"
            />
          </FieldWrap>
          <FieldWrap label="Email">
            <Input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </FieldWrap>
        </div>
      </Section>

      <Section title="Address">
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldWrap label="Street address" full>
            <Input
              value={form.address.streetAddress}
              onChange={(e) => setAddr("streetAddress", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Suburb / locality">
            <Input
              value={form.address.addressLocality}
              onChange={(e) => setAddr("addressLocality", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="State">
            <Input
              value={form.address.addressRegion}
              onChange={(e) => setAddr("addressRegion", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Postcode">
            <Input
              value={form.address.postalCode}
              onChange={(e) => setAddr("postalCode", e.target.value)}
            />
          </FieldWrap>
        </div>
      </Section>

      <Section title="Shared copy">
        <div className="space-y-4">
          <FieldWrap label="Tagline">
            <Input
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Site description (SEO / structured data)">
            <Textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Footer blurb">
            <Textarea
              rows={2}
              value={form.footerBlurb}
              onChange={(e) => set("footerBlurb", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Call-to-action heading">
            <Input
              value={form.ctaTitle}
              onChange={(e) => set("ctaTitle", e.target.value)}
            />
          </FieldWrap>
          <FieldWrap label="Call-to-action subtext">
            <Input
              value={form.ctaSubtitle}
              onChange={(e) => set("ctaSubtitle", e.target.value)}
            />
          </FieldWrap>
        </div>
      </Section>

      {error && (
        <p className="mt-4 text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save settings"}
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function FieldWrap({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
