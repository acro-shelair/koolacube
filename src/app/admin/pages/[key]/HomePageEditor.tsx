"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { HomeStored, HomeProduct, HomeUnit } from "@/lib/content/home";
import { savePageContent, resetPageContent } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StringList, PairList, IconPicker } from "@/components/admin/fields";
import { Plus, Trash2, Check } from "lucide-react";

export default function HomePageEditor({
  path,
  initial,
}: {
  path: string;
  initial: HomeStored;
}) {
  const router = useRouter();
  const [form, setForm] = useState<HomeStored>(initial);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof HomeStored>(key: K, value: HomeStored[K]) {
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
    if (!confirm("Reset the home page to the built-in default copy?")) return;
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
        The phone number in the hero &amp; bottom call-to-action comes from{" "}
        <strong className="text-foreground">Settings</strong>. FAQ questions are
        managed in <strong className="text-foreground">FAQs</strong>.
      </p>

      <Section title="Hero">
        <div className="space-y-4">
          <Field label="Badge"><Input value={form.heroBadge} onChange={(e) => set("heroBadge", e.target.value)} /></Field>
          <Field label="Title — line 1"><Input value={form.heroTitleLine1} onChange={(e) => set("heroTitleLine1", e.target.value)} /></Field>
          <Field label="Title — highlighted line"><Input value={form.heroTitleHighlight} onChange={(e) => set("heroTitleHighlight", e.target.value)} /></Field>
          <Field label="Intro"><Textarea rows={3} value={form.heroIntro} onChange={(e) => set("heroIntro", e.target.value)} /></Field>
          <Field label="Primary button"><Input value={form.heroPrimaryCta} onChange={(e) => set("heroPrimaryCta", e.target.value)} /></Field>
          <Field label="Buy button"><Input value={form.heroBuyCta} onChange={(e) => set("heroBuyCta", e.target.value)} /></Field>
          <StringList label="Trust pills" items={form.heroTrust} onChange={(v) => set("heroTrust", v)} />
        </div>
      </Section>

      <Section title="Product cards">
        <div className="space-y-4">
          <Field label="Tag"><Input value={form.productsTag} onChange={(e) => set("productsTag", e.target.value)} /></Field>
          <Field label="Heading"><Textarea rows={2} value={form.productsHeading} onChange={(e) => set("productsHeading", e.target.value)} /></Field>
          <ProductList items={form.products} onChange={(v) => set("products", v)} />
          <Field label="Footnote"><Textarea rows={2} value={form.productsFootnote} onChange={(e) => set("productsFootnote", e.target.value)} /></Field>
        </div>
      </Section>

      <Section title="Positioning">
        <div className="space-y-4">
          <Field label="Tag"><Input value={form.positioningTag} onChange={(e) => set("positioningTag", e.target.value)} /></Field>
          <Field label="Heading — start"><Input value={form.positioningHeadingPre} onChange={(e) => set("positioningHeadingPre", e.target.value)} /></Field>
          <Field label="Heading — highlighted"><Input value={form.positioningHeadingHighlight} onChange={(e) => set("positioningHeadingHighlight", e.target.value)} /></Field>
          <Field label="Intro"><Textarea rows={3} value={form.positioningIntro} onChange={(e) => set("positioningIntro", e.target.value)} /></Field>
          <StringList label="Industries" items={form.positioningIndustries} onChange={(v) => set("positioningIndustries", v)} />
        </div>
      </Section>

      <Section title="Included / Excluded">
        <div className="space-y-4">
          <Field label="Tag"><Input value={form.includedTag} onChange={(e) => set("includedTag", e.target.value)} /></Field>
          <Field label="Heading"><Input value={form.includedHeading} onChange={(e) => set("includedHeading", e.target.value)} /></Field>
          <StringList label="Included" items={form.included} onChange={(v) => set("included", v)} multiline />
          <StringList label="Excluded / conditions" items={form.excluded} onChange={(v) => set("excluded", v)} multiline />
        </div>
      </Section>

      <Section title="Hire vs Buy">
        <div className="space-y-4">
          <Field label="Tag"><Input value={form.hireVsBuyTag} onChange={(e) => set("hireVsBuyTag", e.target.value)} /></Field>
          <Field label="Heading"><Input value={form.hireVsBuyHeading} onChange={(e) => set("hireVsBuyHeading", e.target.value)} /></Field>
          <PairList
            label="Decision rows"
            items={form.decisions}
            onChange={(v) => set("decisions", v)}
            a={{ key: "need", placeholder: "Need" }}
            b={{ key: "best", placeholder: "Hire or Buy" }}
          />
          <Field label="Button"><Input value={form.hireVsBuyCta} onChange={(e) => set("hireVsBuyCta", e.target.value)} /></Field>
        </div>
      </Section>

      <Section title="Available units preview">
        <div className="space-y-4">
          <Field label="Tag"><Input value={form.availableTag} onChange={(e) => set("availableTag", e.target.value)} /></Field>
          <Field label="Heading"><Input value={form.availableHeading} onChange={(e) => set("availableHeading", e.target.value)} /></Field>
          <Field label="'View all' link label"><Input value={form.availableViewAll} onChange={(e) => set("availableViewAll", e.target.value)} /></Field>
          <UnitList items={form.availableUnits} onChange={(v) => set("availableUnits", v)} />
        </div>
      </Section>

      <Section title="Trust">
        <div className="space-y-4">
          <Field label="Tag"><Input value={form.trustTag} onChange={(e) => set("trustTag", e.target.value)} /></Field>
          <Field label="Heading"><Input value={form.trustHeading} onChange={(e) => set("trustHeading", e.target.value)} /></Field>
          <Field label="Intro"><Textarea rows={3} value={form.trustIntro} onChange={(e) => set("trustIntro", e.target.value)} /></Field>
          <IconLabelList items={form.trustItems} onChange={(v) => set("trustItems", v)} />
        </div>
      </Section>

      <Section title="Service area">
        <div className="space-y-4">
          <Field label="Tag"><Input value={form.serviceTag} onChange={(e) => set("serviceTag", e.target.value)} /></Field>
          <Field label="Heading"><Input value={form.serviceHeading} onChange={(e) => set("serviceHeading", e.target.value)} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Within 50km — label"><Input value={form.serviceWithinLabel} onChange={(e) => set("serviceWithinLabel", e.target.value)} /></Field>
            <Field label="Within 50km — headline"><Input value={form.serviceWithinHeadline} onChange={(e) => set("serviceWithinHeadline", e.target.value)} /></Field>
          </div>
          <Field label="Within 50km — sub text"><Textarea rows={2} value={form.serviceWithinSub} onChange={(e) => set("serviceWithinSub", e.target.value)} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Outside 50km — label"><Input value={form.serviceOutsideLabel} onChange={(e) => set("serviceOutsideLabel", e.target.value)} /></Field>
            <Field label="Outside 50km — headline"><Input value={form.serviceOutsideHeadline} onChange={(e) => set("serviceOutsideHeadline", e.target.value)} /></Field>
          </div>
          <Field label="Outside 50km — sub text"><Textarea rows={2} value={form.serviceOutsideSub} onChange={(e) => set("serviceOutsideSub", e.target.value)} /></Field>
          <StringList label="Area chips" items={form.serviceAreas} onChange={(v) => set("serviceAreas", v)} />
        </div>
      </Section>

      <Section title="FAQ & final CTA">
        <div className="space-y-4">
          <Field label="FAQ tag"><Input value={form.faqTag} onChange={(e) => set("faqTag", e.target.value)} /></Field>
          <Field label="FAQ heading"><Input value={form.faqHeading} onChange={(e) => set("faqHeading", e.target.value)} /></Field>
          <Field label="Final CTA heading — start"><Input value={form.finalCtaHeadingPre} onChange={(e) => set("finalCtaHeadingPre", e.target.value)} /></Field>
          <Field label="Final CTA heading — highlighted"><Input value={form.finalCtaHeadingHighlight} onChange={(e) => set("finalCtaHeadingHighlight", e.target.value)} /></Field>
          <Field label="Final CTA intro"><Textarea rows={2} value={form.finalCtaIntro} onChange={(e) => set("finalCtaIntro", e.target.value)} /></Field>
          <Field label="Final CTA button"><Input value={form.finalCtaPrimary} onChange={(e) => set("finalCtaPrimary", e.target.value)} /></Field>
        </div>
      </Section>

      <Section title="SEO">
        <div className="space-y-4">
          <Field label="Meta title"><Input value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} /></Field>
          <Field label="Meta description"><Textarea rows={2} value={form.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} /></Field>
        </div>
      </Section>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
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

function ProductList({
  items,
  onChange,
}: {
  items: HomeProduct[];
  onChange: (items: HomeProduct[]) => void;
}) {
  const set = (i: number, patch: Partial<HomeProduct>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">Product cards</label>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border p-3">
            <div className="flex items-start justify-between gap-2">
              <IconPicker value={it.icon} onChange={(icon) => set(i, { icon })} />
              <Button type="button" size="icon" variant="ghost" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </div>
            <Input value={it.type} onChange={(e) => set(i, { type: e.target.value })} placeholder="Type (e.g. Cold Room)" />
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" value={it.price} onChange={(e) => set(i, { price: Number(e.target.value) })} placeholder="Price /mo" />
              <Input value={it.daily} onChange={(e) => set(i, { daily: e.target.value })} placeholder="Daily equiv. (e.g. 14.47)" />
            </div>
            <Input value={it.img} onChange={(e) => set(i, { img: e.target.value })} placeholder="Image path" />
            <Textarea rows={2} value={it.blurb} onChange={(e) => set(i, { blurb: e.target.value })} placeholder="Blurb" />
          </div>
        ))}
      </div>
      <Button type="button" size="sm" variant="outline" onClick={() => onChange([...items, { icon: "Snowflake", type: "", price: 0, daily: "", img: "", blurb: "" }])}>
        <Plus className="h-3.5 w-3.5" /> Add product
      </Button>
    </div>
  );
}

function UnitList({
  items,
  onChange,
}: {
  items: HomeUnit[];
  onChange: (items: HomeUnit[]) => void;
}) {
  const set = (i: number, patch: Partial<HomeUnit>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">Units</label>
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-border p-3">
            <div className="flex items-center gap-2">
              <Input value={it.type} onChange={(e) => set(i, { type: e.target.value })} placeholder="Type" />
              <Button type="button" size="icon" variant="ghost" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>
                <Trash2 className="h-3.5 w-3.5 text-destructive" />
              </Button>
            </div>
            <Input value={it.dims} onChange={(e) => set(i, { dims: e.target.value })} placeholder="Internal dimensions" />
            <div className="grid grid-cols-2 gap-2">
              <Input value={it.power} onChange={(e) => set(i, { power: e.target.value })} placeholder="Power" />
              <Input value={it.price} onChange={(e) => set(i, { price: e.target.value })} placeholder="Hire price" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input value={it.status} onChange={(e) => set(i, { status: e.target.value })} placeholder="Status (Available / On Hire / Coming Soon)" />
              <Input value={it.img} onChange={(e) => set(i, { img: e.target.value })} placeholder="Image path" />
            </div>
          </div>
        ))}
      </div>
      <Button type="button" size="sm" variant="outline" onClick={() => onChange([...items, { type: "", dims: "", power: "", price: "", status: "Available", img: "" }])}>
        <Plus className="h-3.5 w-3.5" /> Add unit
      </Button>
    </div>
  );
}

function IconLabelList({
  items,
  onChange,
}: {
  items: HomeStored["trustItems"];
  onChange: (items: HomeStored["trustItems"]) => void;
}) {
  const set = (i: number, patch: Partial<HomeStored["trustItems"][number]>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-foreground">Trust items</label>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-2 rounded-lg border border-border p-3">
            <IconPicker value={it.icon} onChange={(icon) => set(i, { icon })} />
            <Input value={it.label} onChange={(e) => set(i, { label: e.target.value })} placeholder="Label" />
            <Button type="button" size="icon" variant="ghost" onClick={() => onChange(items.filter((_, idx) => idx !== i))}>
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" size="sm" variant="outline" onClick={() => onChange([...items, { icon: "Check", label: "" }])}>
        <Plus className="h-3.5 w-3.5" /> Add item
      </Button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
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
