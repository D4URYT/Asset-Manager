import { createClient } from "@supabase/supabase-js";
import { loadRootEnvFile } from "./env";

loadRootEnvFile();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set for Supabase data access.");
}

export const supabaseData = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

export function nowIso() {
  return new Date().toISOString();
}

export async function addActivity(type: string, description: string, entityName: string) {
  const { error } = await supabaseData.from("activity").insert({
    type,
    description,
    entity_name: entityName,
  });

  if (error) {
    throw error;
  }
}
