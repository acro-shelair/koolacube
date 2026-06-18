import { createClient } from "@/lib/supabase/server";
import { DEFAULT_INDUSTRIES, type Industry } from "@/lib/industries";
import IndustriesClient from "./IndustriesClient";

export const dynamic = "force-dynamic";

export default async function IndustriesAdminPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("industries")
    .select("*")
    .order("display_order", { ascending: true });

  const industries = (data ?? []) as Industry[];
  return (
    <IndustriesClient
      initialIndustries={industries}
      seed={!error && industries.length === 0 ? DEFAULT_INDUSTRIES : []}
    />
  );
}
