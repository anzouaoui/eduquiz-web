// src/app/profile/ProfileClient.tsx  (CLIENT COMPONENT)
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { updateProfile, updateAvatar, signOut } from './actions';
import { AvatarUploader } from '@/components/AvatarUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LogOut } from 'lucide-react';

interface ProfileData {
  full_name: string;
  username: string;
  avatar_url?: string;
}

export default function ProfileClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/auth/login');
          return;
        }
        if (isMounted) setUser(session.user);

        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (error) throw error;

        if (isMounted) {
          setProfile(profileData);
          // si tu veux garder des champs contrôlés :
          // setFormData({ full_name: profileData?.full_name ?? '', username: profileData?.username ?? '' });
        }
      } catch (e) {
        console.error('Error loading user:', e);
        if (isMounted) toast.error('Failed to load user data');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadUser();
    return () => { isMounted = false; };
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const fullName = String(fd.get('full_name') ?? '');
    const username = String(fd.get('username') ?? '');

    try {
      setProfile(prev => (prev ? { ...prev, full_name: fullName, username } : prev));
      const result = await updateProfile(fd);
      if (result && 'error' in result) throw new Error(result.error);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      if (result && 'error' in result) throw new Error(result.error);
      setUser(null);
      setProfile(null);
      router.push('/auth/login');
      router.refresh();
    } catch (err) {
      console.error('Error signing out:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to sign out');
    }
  };

  const handleAvatarUpload = async (url: string) => {
    try {
      const result = await updateAvatar(url);
      if (result && 'error' in result && result.error) throw new Error(String(result.error));
      setProfile(prev => (prev ? { ...prev, avatar_url: url } : prev));
    } catch (err) {
      console.error('Error updating avatar:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to update avatar');
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }
  if (!user) return null;

  return (
    <div className="container py-8 max-w-4xl">
      {/* … ton JSX inchangé (AvatarUploader, formulaire, bouton logout, etc.) … */}
    </div>
  );
}

