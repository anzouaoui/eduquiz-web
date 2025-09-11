'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

type OAuthProvider = 'google' | 'apple';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export async function signInWithEmail(formData: FormData) {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  if (!email || !password) return { error: 'Email et mot de passe requis.' };

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };
  redirect('/');
}

/** Inscription email+mdp */
export async function signUpWithEmail(formData: FormData) {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  const display_name = String(formData.get('display_name') ?? '');

  if (!email || !password) return { error: 'Email et mot de passe requis.' };

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name },
      emailRedirectTo: `${SITE_URL}/auth/callback`,
    },
  });

  if (error) return { error: error.message };
  redirect('/');
}

/** OAuth déclenchée côté serveur (PKCE OK) */
export async function signInWithOAuth(provider: OAuthProvider) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${SITE_URL}/auth/callback` },
  });
  if (error) return { error: error.message };
  if (data?.url) redirect(data.url);
  return { error: 'URL de redirection OAuth introuvable.' };
}

/** Reset password */
export async function sendResetPassword(formData: FormData) {
  const email = String(formData.get('email') ?? '');
  if (!email) return { error: 'Email requis.' };

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE_URL}/auth/update-password`,
  });
  if (error) return { error: error.message };
}

/** Déconnexion */
export async function signOutAction() {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    const { error } = await supabase.auth.signOut();
    
    // Supprimer tous les cookies liés à l'authentification
    cookieStore.getAll().forEach(cookie => {
      if (cookie.name.startsWith('sb-') || cookie.name === 'sb-auth-token') {
        cookieStore.delete(cookie.name);
      }
    });
    
    if (error) {
      console.error('Supabase sign out error:', error);
      return { error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error: 'Une erreur est survenue lors de la déconnexion' };
  }
}
