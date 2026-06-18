import { createClient } from "@/lib/supabase/server";
import MessagesClient from "./MessagesClient";

export const dynamic = "force-dynamic";

export type Message = {
  id: string;
  name: string;
  business: string | null;
  phone: string;
  email: string;
  suburb: string;
  need: string | null;
  mode: string | null;
  start_date: string | null;
  duration: string | null;
  product: string | null;
  volume: string | null;
  power: string | null;
  access: string[];
  message: string | null;
  status: "new" | "read" | "archived";
  created_at: string;
};

export default async function MessagesAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  return <MessagesClient initialMessages={(data ?? []) as Message[]} />;
}
