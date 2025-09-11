'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  const full_name = String(formData.get('full_name') || '');
  const username = String(formData.get('username') || '');
  
  const { error } = await supabase
    .from('profiles')
    .update({ full_name, username })
    .eq('id', user.id);
    
  if (error) {
    console.error('Error updating profile:', error);
    return { error: error.message };
  }
  
  revalidatePath('/profile');
  return { success: true };
}

export async function updateAvatar(avatarUrl: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'Not authenticated' };
  }
  
  const { error } = await supabase
    .from('profiles')
    .update({ avatar_url: avatarUrl })
    .eq('id', user.id);
    
  if (error) {
    console.error('Error updating avatar:', error);
    return { error: error.message };
  }
  
  revalidatePath('/profile');
  return { success: true };
}

export async function signOut() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error signing out:', error);
      return { error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Unexpected error during sign out:', error);
    return { error: 'An unexpected error occurred during sign out' };
  }
}
