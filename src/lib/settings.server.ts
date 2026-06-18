import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { SETTINGS_DEFAULTS, type EffectiveSettings } from "@/lib/settings";

type StoredSettings = Partial<
  Omit<EffectiveSettings, "address"> & {
    address: Partial<EffectiveSettings["address"]>;
  }
>;

/**
 * Read effective settings: DB overrides deep-merged over the defaults.
 * Request-cached so the layout, footer and CtaStrip share one query.
 * Never throws — falls back to defaults if the table/keys aren't ready.
 */
export const getSettings = cache(async (): Promise<EffectiveSettings> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("data")
      .eq("id", 1)
      .single();

    if (error || !data?.data) return SETTINGS_DEFAULTS;

    const stored = data.data as StoredSettings;
    return {
      ...SETTINGS_DEFAULTS,
      ...stored,
      address: { ...SETTINGS_DEFAULTS.address, ...(stored.address ?? {}) },
    };
  } catch {
    return SETTINGS_DEFAULTS;
  }
});
