"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signUpWithEmail(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/auth/callback`,
    },
  });
  if (error) return { error: error.message };
  revalidatePath("/");
  return { ok: true };
}

export async function signInWithEmail(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  revalidatePath("/");
  redirect("/");
}

export async function signInWithOAuth(provider: "google" | "apple") {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/auth/callback`,
      queryParams: provider === "google" ? { prompt: "select_account" } : undefined,
    },
  });
  if (error) return { error: error.message };
  redirect(data.url); // redirects to provider
}

export async function sendResetPassword(formData: FormData) {
  const email = String(formData.get("email") || "");
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/auth/callback`,
  });
  if (error) return { error: error.message };
  return { ok: true };
}

export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/");
  redirect("/");
}
