'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Edit, Trash2 } from 'lucide-react';

// Mock user data - replace with actual user data from your auth context
const mockUser = {
  displayName: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  isPremium: false,
  avatar: '',
};

export default function ProfilePage() {
  const [displayName, setDisplayName] = useState(mockUser.displayName);
  const [isEditing, setIsEditing] = useState(false);
  const [isPremium, setIsPremium] = useState(mockUser.isPremium);
  const router = useRouter();

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
    // router.push('/auth/login');
  };

  const handleSaveName = () => {
    // Implement name update logic here
    console.log('Updating display name to:', displayName);
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic here
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      console.log('Deleting account...');
      // router.push('/');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>
      
      <div className="grid gap-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle>Profil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={mockUser.avatar} alt={displayName} />
                <AvatarFallback className="text-xl">
                  {getInitials(displayName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <div className="flex items-center space-x-2 flex-1">
                      <Input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="sm" onClick={handleSaveName}>
                        Enregistrer
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold">{displayName}</h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                        <span className="sr-only">Modifier le nom</span>
                      </Button>
                    </>
                  )}
                </div>
                <p className="text-muted-foreground">{mockUser.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Card */}
        <Card>
          <CardHeader>
            <CardTitle>Abonnement</CardTitle>
            <CardDescription>Gérez votre abonnement Premium</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Abonnement Premium</p>
                <p className="text-sm text-muted-foreground">
                  {isPremium ? 'Actif' : 'Inactif'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Switch
                  checked={isPremium}
                  onCheckedChange={setIsPremium}
                  aria-label="Activer/désactiver Premium"
                />
                <Button variant="outline" onClick={() => router.push('/pricing')}>
                  Gérer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Card */}
        <Card>
          <CardHeader>
            <CardTitle>Sécurité</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Se déconnecter
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={handleDeleteAccount}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer mon compte
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
