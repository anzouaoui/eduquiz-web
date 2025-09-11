'use server';

import { cookies } from 'next/headers';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';

export async function signInWithEmail(email: string, password: string) {
  const supabase = createServerActionClient({ cookies });
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signInWithOAuth(provider: 'google' | 'apple') {
  const supabase = createServerActionClient({ cookies });

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) throw error;

  // Redirige explicitement si besoin (sinon le SDK le fait aussi)
  return data?.url;
}
