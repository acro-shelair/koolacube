"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Industry } from "@/lib/industries";
import {
  createIndustry,
  updateIndustry,
  deleteIndustry,
  toggleIndustryPublished,
  type IndustryInput,
} from "./actions";
import { getIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Modal, Toggle } from "@/components/ui/modal";
import { StringList, IconPicker } from "@/components/admin/fields";
import { Plus, Pencil, Trash2, Building2, Eye, EyeOff, Sparkles } from "lucide-react";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function IndustriesClient({
  initialIndustries,
  seed,
}: {
  initialIndustries: Industry[];
  seed: Industry[];
}) {
  const router = useRouter();
  const [industries, setIndustries] = useState(initialIndustries);
  const [dialog, setDialog] = useState<{ open: boolean; industry?: Industry }>({
    open: false,
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleDelete(id: string) {
    setBusy(true);
    await deleteIndustry(id);
    setIndustries((prev) => prev.filter((u) => u.id !== id));
    setConfirmDeleteId(null);
    setBusy(false);
    router.refresh();
  }

  async function handleToggle(it: Industry) {
    const next = !it.is_published;
    setIndustries((prev) =>
      prev.map((x) => (x.id === it.id ? { ...x, is_published: next } : x))
    );
    await toggleIndustryPublished(it.id, next);
    router.refresh();
  }

  async function handleSeed() {
    setBusy(true);
    for (const it of seed) {
      await createIndustry({
        slug: it.slug,
        icon: it.icon,
        name: it.name,
        tagline: it.tagline,
        intro: it.intro,
        challenges: it.challenges,
        helps: it.helps,
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
          <h1 className="text-2xl font-bold">Industries</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            The sectors shown on the Industries page.
          </p>
        </div>
        <Button size="sm" onClick={() => setDialog({ open: true })}>
          <Plus className="h-4 w-4" /> New industry
        </Button>
      </div>

      {industries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <Building2 className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">No industries yet.</p>
          {seed.length > 0 && (
            <Button
              className="mt-4"
              variant="outline"
              size="sm"
              onClick={handleSeed}
              disabled={busy}
            >
              <Sparkles className="h-4 w-4" />
              {busy ? "Adding…" : `Import ${seed.length} current industries from the site`}
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {industries.map((it) => {
            const Icon = getIcon(it.icon);
            const confirming = confirmDeleteId === it.id;
            return (
              <div
                key={it.id}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold">{it.name}</p>
                    {!it.is_published && (
                      <span className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {it.tagline}
                  </p>
                  <div className="mt-3 flex items-center gap-1">
                    <Button size="sm" variant="ghost" onClick={() => handleToggle(it)}>
                      {it.is_published ? (
                        <Eye className="h-3.5 w-3.5" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setDialog({ open: true, industry: it })}
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
                          onClick={() => handleDelete(it.id)}
                          disabled={busy}
                        >
                          Confirm
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setConfirmDeleteId(it.id)}
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
        <IndustryDialog
          industry={dialog.industry}
          onClose={() => setDialog({ open: false })}
          onSaved={(created) => {
            if (created) setIndustries((prev) => [...prev, created]);
            setDialog({ open: false });
            router.refresh();
          }}
        />
      )}
    </div>
  );
}

function IndustryDialog({
  industry,
  onClose,
  onSaved,
}: {
  industry?: Industry;
  onClose: () => void;
  onSaved: (created?: Industry) => void;
}) {
  const isEdit = !!industry;
  const [name, setName] = useState(industry?.name ?? "");
  const [slug, setSlug] = useState(industry?.slug ?? "");
  const [icon, setIcon] = useState(industry?.icon ?? "ChefHat");
  const [tagline, setTagline] = useState(industry?.tagline ?? "");
  const [intro, setIntro] = useState(industry?.intro ?? "");
  const [challenges, setChallenges] = useState<string[]>(industry?.challenges ?? []);
  const [helps, setHelps] = useState<string[]>(industry?.helps ?? []);
  const [isPublished, setIsPublished] = useState(industry?.is_published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError("Name is required.");
    setSaving(true);
    setError(null);

    const payload: IndustryInput = {
      slug: (slug.trim() || slugify(name)).trim(),
      icon,
      name: name.trim(),
      tagline: tagline.trim(),
      intro: intro.trim(),
      challenges: challenges.map((c) => c.trim()).filter(Boolean),
      helps: helps.map((h) => h.trim()).filter(Boolean),
      is_published: isPublished,
    };

    const result = isEdit
      ? await updateIndustry(industry.id, payload)
      : await createIndustry(payload);
    setSaving(false);
    if (result?.error) return setError(result.error);
    onSaved("industry" in result ? (result.industry as Industry) : undefined);
  }

  return (
    <Modal open onClose={onClose} size="2xl" title={isEdit ? "Edit industry" : "New industry"}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Hospitality & Catering"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Slug (URL anchor)</Label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder={slugify(name) || "hospitality"}
            />
          </div>
          <IconPicker value={icon} onChange={setIcon} />
        </div>

        <div className="space-y-1.5">
          <Label>Tagline (shown as the section heading)</Label>
          <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Intro</Label>
          <Textarea rows={3} value={intro} onChange={(e) => setIntro(e.target.value)} />
        </div>

        <StringList
          label="Industry challenges"
          items={challenges}
          onChange={setChallenges}
          placeholder="e.g. Compliance with food safety standards"
        />
        <StringList
          label="How Koolacube helps"
          items={helps}
          onChange={setHelps}
          placeholder="e.g. Fast delivery and maintenance-backed reliability"
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
            {saving ? "Saving…" : "Save industry"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
