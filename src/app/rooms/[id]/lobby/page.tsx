'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Copy, Users, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface Player {
  id: string;
  name: string;
  avatar?: string;
  isHost: boolean;
  isReady: boolean;
}

interface RoomData {
  id: string;
  code: string;
  status: 'waiting' | 'in_progress';
  players: Player[];
  isHost: boolean;
}

export default function RoomLobbyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [room, setRoom] = useState<RoomData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock data
        const mockRoom: RoomData = {
          id,
          code: 'ABC123',
          status: 'waiting',
          isHost: true, // This would come from your auth context
          players: [
            { id: '1', name: 'You', isHost: true, isReady: true },
            { id: '2', name: 'Alice', isHost: false, isReady: false },
            { id: '3', name: 'Bob', isHost: false, isReady: true },
          ],
        };
        
        setRoom(mockRoom);
        setIsReady(mockRoom.players.find(p => p.id === '1')?.isReady || false);
      } catch (err) {
        console.error('Failed to fetch room:', err);
        setError('Failed to load room. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleCopyCode = () => {
    if (!room) return;
    navigator.clipboard.writeText(room.code);
    setCopied(true);
    toast.success('Code copié dans le presse-papier');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyInviteLink = () => {
    const inviteLink = `${window.location.origin}/join?room=${encodeURIComponent(room?.code || '')}`;
    navigator.clipboard.writeText(inviteLink);
    toast.success('Lien d\'invitation copié');
  };

  const toggleReady = async () => {
    try {
      // TODO: Call API to update ready status
      await new Promise(resolve => setTimeout(resolve, 300));
      setIsReady(!isReady);
    } catch (err) {
      console.error('Failed to update ready status:', err);
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const startGame = async () => {
    if (!room) return;
    
    try {
      setIsStarting(true);
      // TODO: Call API to start game
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to game page
      router.push(`/rooms/${id}/game`);
    } catch (err) {
      console.error('Failed to start game:', err);
      toast.error('Impossible de démarrer la partie');
      setIsStarting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chargement de la salle...</p>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error || 'Salle introuvable'}</p>
      </div>
    );
  }

  const canStartGame = room.isHost && room.players.length >= 2;
  const inviteLink = `${window.location.origin}/join?room=${encodeURIComponent(room.code)}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Room Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Salle de jeu</h1>
            <p className="text-muted-foreground">
              {room.status === 'waiting' ? 'En attente des joueurs...' : 'Partie en cours'}
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-lg">
            <div className="bg-background px-3 py-1 rounded-md font-mono font-bold">
              {room.code}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleCopyCode}
              className={copied ? 'text-green-500' : ''}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Invite Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Inviter des amis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 p-3 bg-muted/50 rounded-md text-sm break-all">
                {inviteLink}
              </div>
              <Button 
                variant="outline" 
                onClick={handleCopyInviteLink}
                className="whitespace-nowrap"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copier le lien
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Players List */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Joueurs</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                {room.players.length}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {room.players.map((player) => (
                <div 
                  key={player.id} 
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback>
                        {player.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{player.name}</span>
                        {player.isHost && (
                          <Badge variant="secondary" className="text-xs">
                            Hôte
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {player.isReady ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      <Check className="h-3 w-3 mr-1" /> Prêt
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      <X className="h-3 w-3 mr-1" /> En attente
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          {room.isHost ? (
            <Button 
              onClick={startGame}
              disabled={!canStartGame || isStarting}
              className="min-w-[180px]"
            >
              {isStarting ? 'Démarrage...' : 'Démarrer la partie'}
            </Button>
          ) : (
            <Button 
              onClick={toggleReady}
              variant={isReady ? 'default' : 'outline'}
              className="min-w-[120px]"
            >
              {isReady ? 'Prêt !' : 'Je suis prêt'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
