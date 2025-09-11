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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
  });
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
        
        if (isMounted) {
          setUser(session.user);
        }
        
        // Fetch profile data
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error) throw error;
        
        if (isMounted) {
          setProfile(profileData);
          setFormData({
            full_name: profileData?.full_name || '',
            username: profileData?.username || ''
          });
        }
      } catch (error) {
        console.error('Error loading user:', error);
        if (isMounted) {
          toast.error('Failed to load user data');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadUser();
    
    return () => {
      isMounted = false;
    };
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const fullName = formData.get('full_name') as string;
    const username = formData.get('username') as string;
    
    try {
      // Update local state immediately for better UX
      setProfile((prev) => ({
        ...prev,
        full_name: fullName,
        username: username
      }));
      
      const result = await updateProfile(formData);
      
      if (result && 'error' in result) {
        throw new Error(result.error);
      }
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      // Revert local state on error
      if (profile) {
        setProfile((prev) => ({
          ...prev,
          full_name: profile.full_name,
          username: profile.username
        }));
      }
      
      console.error('Error updating profile:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
      toast.error(errorMessage);
    }
  };

  const handleSignOut = async () => {
    try {
      const result = await signOut();
      
      if (result && 'error' in result) {
        throw new Error(result.error);
      }
      
      // Clear any client-side state if needed
      setUser(null);
      setProfile(null);
      
      // Redirect to login page
      router.push('/auth/login');
      router.refresh();
    } catch (error) {
      console.error('Error signing out:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to sign out';
      toast.error(errorMessage);
    }
  };

  const handleAvatarUpload = async (url: string): Promise<void> => {
    try {
      const result = await updateAvatar(url);
      
      if (result && 'error' in result && result.error) {
        throw new Error(typeof result.error === 'string' ? result.error : 'Failed to update avatar');
      }
      
      setProfile((prev) => (prev ? { ...prev, avatar_url: url } : null));
    } catch (error) {
      console.error('Error updating avatar:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update avatar';
      toast.error(errorMessage);
      throw error; // Re-throw to allow AvatarUploader to handle the error
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Profil</h1>
          <p className="text-muted-foreground">
            Gérez vos informations personnelles et vos paramètres de compte.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Photo de profil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <AvatarUploader 
                    userId={user.id} 
                    avatarUrl={profile?.avatar_url || null} 
                    onUpload={handleAvatarUpload} 
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sécurité</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut}
                  className="w-full"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Se déconnecter
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    defaultValue={user?.email || ''} 
                    disabled 
                    className="bg-muted/50"
                  />
                </div>
                
                <div>
                  <Label htmlFor="full_name" className="block text-sm font-medium text-muted-foreground mb-1">
                    Nom complet
                  </Label>
                  <Input 
                    id="full_name" 
                    name="full_name" 
                    defaultValue={profile?.full_name || ''} 
                    placeholder="Votre nom"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="username" className="block text-sm font-medium text-muted-foreground mb-1">
                    Nom d'utilisateur
                  </Label>
                  <Input 
                    id="username" 
                    name="username" 
                    defaultValue={profile?.username || ''} 
                    placeholder="Votre nom d'utilisateur"
                    required
                    minLength={3}
                  />
                </div>
                
                <div className="pt-2">
                  <Button type="submit" className="w-full">
                    Enregistrer les modifications
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
