import { createBrowserClient } from "@supabase/ssr";

const supabaseBrowser = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

export { supabaseBrowser };
export const createClient = supabaseBrowser;
