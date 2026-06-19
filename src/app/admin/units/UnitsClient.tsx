"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Unit, UnitCategory, UnitSpec } from "@/lib/units";
import {
  createUnit,
  updateUnit,
  deleteUnit,
  toggleUnitPublished,
  type UnitInput,
} from "./actions";
import { getIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Modal, Toggle } from "@/components/ui/modal";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { StringList, IconPicker } from "@/components/admin/fields";
import { Plus, Pencil, Trash2, Boxes, Eye, EyeOff, Sparkles } from "lucide-react";

const CATEGORIES: { value: UnitCategory; label: string }[] = [
  { value: "cooler", label: "Cooler" },
  { value: "freezer", label: "Freezer" },
  { value: "dual", label: "Dual Temp" },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function UnitsClient({
  initialUnits,
  seed,
}: {
  initialUnits: Unit[];
  seed: Unit[];
}) {
  const router = useRouter();
  const [units, setUnits] = useState(initialUnits);
  const [dialog, setDialog] = useState<{ open: boolean; unit?: Unit }>({ open: false });
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleDelete(id: string) {
    setBusy(true);
    await deleteUnit(id);
    setUnits((prev) => prev.filter((u) => u.id !== id));
    setConfirmDeleteId(null);
    setBusy(false);
    router.refresh();
  }

  async function handleToggle(u: Unit) {
    const next = !u.is_published;
    setUnits((prev) => prev.map((x) => (x.id === u.id ? { ...x, is_published: next } : x)));
    await toggleUnitPublished(u.id, next);
    router.refresh();
  }

  async function handleSeed() {
    setBusy(true);
    for (const u of seed) {
      await createUnit({
        slug: u.slug,
        category: u.category,
        icon: u.icon,
        name: u.name,
        tagline: u.tagline,
        intro: u.intro,
        img: u.img,
        specs: u.specs,
        applications: u.applications,
        is_published: true,
      });
    }
    setBusy(false);
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Units</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            The cooler, freezer and dual-temp rooms shown on the Available Units page.
          </p>
        </div>
        <Button size="sm" onClick={() => setDialog({ open: true })}>
          <Plus className="h-4 w-4" /> New unit
        </Button>
      </div>

      {units.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <Boxes className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No units yet.</p>
          {seed.length > 0 && (
            <Button
              className="mt-4"
              variant="outline"
              size="sm"
              onClick={handleSeed}
              disabled={busy}
            >
              <Sparkles className="h-4 w-4" />
              {busy ? "Adding…" : `Import ${seed.length} current units from the site`}
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {units.map((u) => {
            const Icon = getIcon(u.icon);
            const confirming = confirmDeleteId === u.id;
            return (
              <div
                key={u.id}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold">{u.name}</p>
                    {!u.is_published && (
                      <span className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-accent">
                    {u.category}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {u.tagline}
                  </p>
                  <div className="mt-3 flex items-center gap-1">
                    <Button size="sm" variant="ghost" onClick={() => handleToggle(u)}>
                      {u.is_published ? (
                        <Eye className="h-3.5 w-3.5" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setDialog({ open: true, unit: u })}
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Button>
                    {confirming ? (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(u.id)}
                          disabled={busy}
                        >
                          Confirm
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setConfirmDeleteId(u.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {dialog.open && (
        <UnitDialog
          unit={dialog.unit}
          onClose={() => setDialog({ open: false })}
          onSaved={(created) => {
            if (created) setUnits((prev) => [...prev, created]);
            setDialog({ open: false });
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

/** Spec value stored as string | string[]. The editor uses a textarea where
 *  multiple lines become an array, a single line stays a string. */
function valueToText(v: string | string[]): string {
  return Array.isArray(v) ? v.join("\n") : v;
}
function textToValue(t: string): string | string[] {
  const lines = t.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines.length > 1 ? lines : t.trim();
}

function UnitDialog({
  unit,
  onClose,
  onSaved,
}: {
  unit?: Unit;
  onClose: () => void;
  onSaved: (created?: Unit) => void;
}) {
  const isEdit = !!unit;
  const [name, setName] = useState(unit?.name ?? "");
  const [slug, setSlug] = useState(unit?.slug ?? "");
  const [category, setCategory] = useState<UnitCategory>(unit?.category ?? "cooler");
  const [icon, setIcon] = useState(unit?.icon ?? "Snowflake");
  const [tagline, setTagline] = useState(unit?.tagline ?? "");
  const [intro, setIntro] = useState(unit?.intro ?? "");
  const [img, setImg] = useState(unit?.img ?? "");
  const [specs, setSpecs] = useState<UnitSpec[]>(unit?.specs ?? []);
  const [applications, setApplications] = useState<string[]>(unit?.applications ?? []);
  const [isPublished, setIsPublished] = useState(unit?.is_published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateSpec(i: number, patch: Partial<{ feature: string; value: string }>) {
    setSpecs((prev) =>
      prev.map((s, idx) =>
        idx === i
          ? {
              feature: patch.feature ?? s.feature,
              value: patch.value !== undefined ? textToValue(patch.value) : s.value,
            }
          : s
      )
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError("Name is required.");
    setSaving(true);
    setError(null);

    const payload: UnitInput = {
      slug: (slug.trim() || slugify(name)).trim(),
      category,
      icon,
      name: name.trim(),
      tagline: tagline.trim(),
      intro: intro.trim(),
      img: img.trim(),
      specs: specs.filter((s) => s.feature.trim()),
      applications: applications.map((a) => a.trim()).filter(Boolean),
      is_published: isPublished,
    };

    const result = isEdit
      ? await updateUnit(unit.id, payload)
      : await createUnit(payload);
    setSaving(false);
    if (result?.error) return setError(result.error);
    onSaved("unit" in result ? (result.unit as Unit) : undefined);
  }

  return (
    <Modal
      open
      onClose={onClose}
      size="2xl"
      title={isEdit ? "Edit unit" : "New unit"}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Cooler Room — Mobile Refrigerated Storage"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Slug (URL anchor)</Label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder={slugify(name) || "cooler-room"}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Category</Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as UnitCategory)}
              className="h-10 w-full rounded-lg border border-input bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <IconPicker value={icon} onChange={setIcon} />
        </div>

        <div className="space-y-1.5">
          <Label>Tagline</Label>
          <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Intro</Label>
          <Textarea rows={3} value={intro} onChange={(e) => setIntro(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Image</Label>
          <ImageUploader value={img} onChange={setImg} heightClass="h-40" />
        </div>

        {/* Specs */}
        <div className="space-y-1.5">
          <Label>Specifications</Label>
          <div className="space-y-2">
            {specs.map((s, i) => (
              <div key={i} className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-2">
                  <Input
                    value={s.feature}
                    onChange={(e) => updateSpec(i, { feature: e.target.value })}
                    placeholder="Feature (e.g. Temperature Range)"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => setSpecs((p) => p.filter((_, idx) => idx !== i))}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
                <Textarea
                  className="mt-2"
                  rows={1}
                  value={valueToText(s.value)}
                  onChange={(e) => updateSpec(i, { value: e.target.value })}
                  placeholder="Value (one line, or multiple lines for a list)"
                />
              </div>
            ))}
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setSpecs((p) => [...p, { feature: "", value: "" }])}
          >
            <Plus className="h-3.5 w-3.5" /> Add spec
          </Button>
        </div>

        <StringList
          label="Ideal applications"
          items={applications}
          onChange={setApplications}
          placeholder="e.g. Restaurants, cafés & catering"
        />

        <Toggle
          checked={isPublished}
          onChange={setIsPublished}
          label={isPublished ? "Published" : "Draft (hidden from site)"}
        />

        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save unit"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
