import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client instance
 * Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env vars
 *
 * In development/preview: Check .env.local or environment settings
 * In production: Configure in Vercel project settings
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Log configuration status (technical info for debugging only)
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      "[Supabase] Configuration incomplete. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
    // Return client with empty credentials - API requests will fail gracefully
  }

  return createSupabaseClient(supabaseUrl || "", supabaseAnonKey || "");
}
