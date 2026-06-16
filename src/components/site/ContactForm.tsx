"use client";

import { useState } from "react";
import { z } from "zod";
import { Check } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(120),
  business: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().min(6, "Phone required").max(40),
  email: z.string().trim().email("Valid email required").max(255),
  suburb: z.string().trim().min(1, "Suburb / site location required").max(160),
  need: z.enum(["Cold Room", "Freezer Room", "Dual Temp", "Unsure"]),
  mode: z.enum(["Hire", "Buy"]),
  startDate: z.string().trim().max(60).optional().or(z.literal("")),
  duration: z.string().trim().max(120).optional().or(z.literal("")),
  product: z.string().trim().max(255).optional().or(z.literal("")),
  volume: z.string().trim().max(120).optional().or(z.literal("")),
  power: z.string().trim().max(120).optional().or(z.literal("")),
  access: z.array(z.string()).default([]),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  acknowledge: z.literal(true, {
    errorMap: () => ({ message: "Please acknowledge to continue" }),
  }),
});

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      business: String(fd.get("business") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      suburb: String(fd.get("suburb") || ""),
      need: String(fd.get("need") || "Unsure") as "Cold Room" | "Freezer Room" | "Dual Temp" | "Unsure",
      mode: String(fd.get("mode") || "Hire") as "Hire" | "Buy",
      startDate: String(fd.get("startDate") || ""),
      duration: String(fd.get("duration") || ""),
      product: String(fd.get("product") || ""),
      volume: String(fd.get("volume") || ""),
      power: String(fd.get("power") || ""),
      access: fd.getAll("access").map(String),
      message: String(fd.get("message") || ""),
      acknowledge: fd.get("acknowledge") === "on" ? true : undefined,
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0]);
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-cold-blue/30 bg-white p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cold-blue/10 text-cold-blue">
          <Check className="h-7 w-7" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold">Enquiry received.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks — we'll be in touch shortly. For urgent matters call 1300 561 030.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-lg border border-border bg-white p-6 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" required error={errors.name} />
        <Field label="Business Name" name="business" error={errors.business} />
        <Field label="Phone" name="phone" type="tel" required error={errors.phone} />
        <Field label="Email" name="email" type="email" required error={errors.email} />
        <Field
          label="Suburb / Site Location"
          name="suburb"
          required
          error={errors.suburb}
        />
        <SelectField
          label="Need"
          name="need"
          error={errors.need}
          options={["Cold Room", "Freezer Room", "Dual Temp", "Unsure"]}
        />
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-foreground">Hire or Buy</legend>
        <div className="mt-3 flex gap-3">
          {["Hire", "Buy"].map((v, i) => (
            <label
              key={v}
              className="flex flex-1 cursor-pointer items-center gap-2 rounded border border-border bg-white px-4 py-3 text-sm hover:border-cold-blue has-[:checked]:border-cold-blue has-[:checked]:bg-cold-blue/5"
            >
              <input
                type="radio"
                name="mode"
                value={v}
                defaultChecked={i === 0}
                className="accent-cold-blue"
              />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Required Start Date" name="startDate" type="date" />
        <Field
          label="Expected Hire Duration"
          name="duration"
          placeholder="e.g. 3 months"
        />
        <Field
          label="Product Stored"
          name="product"
          placeholder="e.g. meat, dairy, produce"
        />
        <Field
          label="Approximate Storage Volume"
          name="volume"
          placeholder="e.g. 6 pallets"
        />
        <Field
          label="Existing Power Supply"
          name="power"
          placeholder="e.g. 240V 15A / 3-phase / unsure"
        />
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-foreground">Site Access</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
          {["Forklift", "Crane", "Truck Access", "Unsure"].map((v) => (
            <label
              key={v}
              className="flex cursor-pointer items-center gap-2 rounded border border-border bg-white px-3 py-2.5 text-sm hover:border-cold-blue has-[:checked]:border-cold-blue has-[:checked]:bg-cold-blue/5"
            >
              <input
                type="checkbox"
                name="access"
                value={v}
                className="accent-cold-blue"
              />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="text-sm font-semibold text-foreground">Message</label>
        <textarea
          name="message"
          rows={5}
          maxLength={2000}
          className="mt-2 w-full rounded border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-cold-blue"
        />
      </div>

      <label className="flex items-start gap-3 rounded border border-border bg-muted/30 p-4 text-sm">
        <input
          type="checkbox"
          name="acknowledge"
          className="mt-0.5 accent-cold-blue"
        />
        <span>
          I understand Koolacube is focused on business, long-term hire and sales —
          not short-term party or event hire.
        </span>
      </label>
      {errors.acknowledge && (
        <p className="text-xs text-orange">{errors.acknowledge}</p>
      )}

      <button
        type="submit"
        className="w-full rounded bg-orange px-5 py-3.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-orange-hover"
      >
        Send Enquiry
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground">
        {label}
        {required && <span className="ml-1 text-orange">*</span>}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-cold-blue"
      />
      {error && <p className="mt-1 text-xs text-orange">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  error,
}: {
  label: string;
  name: string;
  options: string[];
  error?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <select
        name={name}
        defaultValue={options[0]}
        className="mt-2 w-full rounded border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-cold-blue"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-orange">{error}</p>}
    </div>
  );
}
