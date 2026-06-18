import { createClient } from "@/lib/supabase/server";
import { DEFAULT_UNITS, type Unit } from "@/lib/units";
import UnitsClient from "./UnitsClient";

export const dynamic = "force-dynamic";

export default async function UnitsAdminPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("units")
    .select("*")
    .order("display_order", { ascending: true });

  // If the table is reachable but empty, offer the current site units as a seed.
  const units = (data ?? []) as Unit[];
  return (
    <UnitsClient
      initialUnits={units}
      seed={!error && units.length === 0 ? DEFAULT_UNITS : []}
    />
  );
}
