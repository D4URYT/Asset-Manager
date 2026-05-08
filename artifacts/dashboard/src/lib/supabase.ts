import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ?? "https://axwlknwfgkydihezcdpl.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4d2xrbndmZ2t5ZGloZXpjZHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNjQ5MDksImV4cCI6MjA5MzY0MDkwOX0.HEqX2Lhmvgzl5dIfIXnBgEwAvaIN3e8DzKnn9D7TVCo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
