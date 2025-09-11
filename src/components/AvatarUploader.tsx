'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function AvatarUploader({ userId, avatarUrl, onUpload }: { userId: string; avatarUrl: string | null; onUpload: (url: string) => Promise<void> }) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClientComponentClient();

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      // Validate file selection
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Veuillez sélectionner une image à téléverser.');
      }

      const file = event.target.files[0];
      
      // Validate file type
      const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validImageTypes.includes(file.type)) {
        throw new Error('Format de fichier non supporté. Veuillez utiliser une image JPEG, PNG ou WebP.');
      }
      
      // Validate file size (max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        throw new Error('La taille de l\'image ne doit pas dépasser 2 Mo.');
      }

      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const filePath = `${userId}-${Date.now()}.${fileExt}`;

      // Show uploading toast
      const toastId = toast.loading('Téléversement de l\'avatar en cours...');
      
      try {
        // Upload the file
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw uploadError;

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        // Call the server action to update the profile
        await onUpload(publicUrl);
        
        toast.success('Avatar mis à jour avec succès !', { id: toastId });
      } catch (error) {
        toast.dismiss(toastId);
        throw error;
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors du téléversement de l\'avatar';
      toast.error(errorMessage);
      throw error; // Re-throw to allow parent component to handle the error
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative group">
        <Avatar className="h-28 w-28 border-2 border-muted">
          <AvatarImage 
            src={avatarUrl ? `${avatarUrl}?t=${Date.now()}` : ''} 
            alt="Photo de profil" 
            className="object-cover"
          />
          <AvatarFallback className="bg-muted text-2xl">
            {userId ? userId[0].toUpperCase() : 'U'}
          </AvatarFallback>
        </Avatar>
        
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}
        
        <div className="absolute bottom-0 right-0 p-1 bg-background rounded-full border-2 border-white shadow-sm group-hover:bg-accent transition-colors">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-muted-foreground group-hover:text-foreground"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-1">
          {uploading ? 'Téléversement en cours...' : 'Formats supportés: JPG, PNG, WebP (max 2 Mo)'}
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          className="relative group/button"
        >
          <span className="group-hover/button:opacity-0 transition-opacity">
            {uploading ? 'Téléversement...' : 'Changer la photo'}
          </span>
          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/button:opacity-100 transition-opacity">
            Parcourir
          </span>
          <input
            type="file"
            accept="image/jpeg, image/png, image/webp"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            onChange={uploadAvatar}
            disabled={uploading}
            aria-label="Changer la photo de profil"
          />
        </Button>
      </div>
    </div>
  );
}
