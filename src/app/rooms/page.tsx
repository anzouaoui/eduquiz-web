import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PageBackground } from '@/components/ui/PageBackground';
import Link from 'next/link';
import { Search } from 'lucide-react';

type RoomStatus = 'lobby' | 'live';

interface Room {
  id: string;
  title: string;
  playerCount: number;
  maxPlayers: number;
  status: RoomStatus;
}

export default function RoomsPage() {
  // Mock data - replace with actual API call
  const rooms: Room[] = [
    { id: '1', title: 'Math Challenge', playerCount: 3, maxPlayers: 5, status: 'lobby' },
    { id: '2', title: 'History Buffs', playerCount: 5, maxPlayers: 5, status: 'live' },
    { id: '3', title: 'Science Quiz', playerCount: 2, maxPlayers: 4, status: 'lobby' },
  ];

  const isLoading = false; // Set to true when loading
  const error = null; // Set error message if any
  const isPremium = false; // Replace with actual premium check

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Chargement des salles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Erreur lors du chargement des salles: {error}</p>
      </div>
    );
  }

  return (
    <PageBackground variant="primary" className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Code de la room"
              className="pl-10"
            />
          </div>
          <Button className="whitespace-nowrap">Rejoindre</Button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Salles disponibles</h1>
          <Button asChild>
            <Link href={isPremium ? "/rooms/create" : "/premium"}>
              Créer une room
            </Link>
          </Button>
        </div>

        {rooms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucune salle disponible pour le moment</p>
            <Button variant="link" asChild className="mt-4">
              <Link href={isPremium ? "/rooms/create" : "/premium"}>
                Créer la première salle
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {rooms.map((room) => (
              <Card key={room.id} className="hover:bg-accent/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{room.title}</CardTitle>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      room.status === 'lobby' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {room.status === 'lobby' ? 'En attente' : 'En cours'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">
                    {room.playerCount} / {room.maxPlayers} joueurs
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button size="sm" variant="outline" className="w-full">
                    Rejoindre
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
    </PageBackground>
  );
}
