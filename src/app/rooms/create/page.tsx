'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { createRoom } from '@/lib/api/rooms';

export default function CreateRoomPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // This would come from your auth context or user store
  const isPremium = false; // Replace with actual premium check

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Veuillez entrer un titre pour la salle');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call your API to create a room
      const newRoom = await createRoom({
        title,
        isPublic,
      });

      // Redirect to the new room's lobby
      router.push(`/rooms/${newRoom.id}/lobby`);
    } catch (err) {
      console.error('Failed to create room:', err);
      setError('Une erreur est survenue lors de la création de la salle');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Créer une nouvelle salle
              {isPremium && (
                <Badge variant="premium" className="uppercase text-xs">
                  Premium
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la salle</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Quiz de Mathématiques"
                  maxLength={50}
                  disabled={isLoading}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="space-y-0.5">
                  <Label htmlFor="visibility">Salle {isPublic ? 'publique' : 'privée'}</Label>
                  <p className="text-sm text-muted-foreground">
                    {isPublic 
                      ? 'Tout le monde peut rejoindre avec le code' 
                      : 'Seuls les utilisateurs avec le lien peuvent rejoindre'}
                  </p>
                </div>
                <Switch
                  id="visibility"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading || !title.trim()}>
                {isLoading ? 'Création...' : 'Créer la salle'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
