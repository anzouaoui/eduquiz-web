'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { PartyPopper } from 'lucide-react';
import { motion } from 'framer-motion';

interface RoundHistory {
  level: number;
  questionId: string;
  eliminatedPlayer: {
    id: string;
    name: string;
    avatar?: string;
  } | null;
}

export default function RoomSummaryPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  // Mock data - replace with actual API call
  const winner = {
    id: '1',
    name: 'John Doe',
    avatar: '/placeholder-avatar.jpg'
  };

  // Mock round history - replace with actual data
  const roundHistory: RoundHistory[] = [
    { level: 1, questionId: 'q1', eliminatedPlayer: null },
    { level: 2, questionId: 'q2', eliminatedPlayer: { id: '2', name: 'Alice' } },
    { level: 3, questionId: 'q3', eliminatedPlayer: { id: '3', name: 'Bob' } },
  ];

  const handleRevenge = () => {
    // TODO: Implement rematch logic
    toast.success('Nouvelle partie lancée !');
    router.push(`/rooms/${id}/lobby`);
  };

  const handleBackToRooms = () => {
    router.push('/rooms');
  };

  // Trigger confetti effect when component mounts
  useEffect(() => {
    // This is a simple confetti effect. For a more robust solution, consider using a library like react-confetti
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    
    const createConfetti = () => {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.left = `${Math.random() * 100}vw`;
      confetti.style.top = '-10px';
      confetti.style.pointerEvents = 'none';
      
      document.body.appendChild(confetti);
      
      const animation = confetti.animate(
        [
          { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
          { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ],
        {
          duration: 2000 + Math.random() * 3000,
          easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)',
          fill: 'forwards'
        }
      );
      
      animation.onfinish = () => confetti.remove();
    };

    const interval = setInterval(createConfetti, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Partie Terminée !</h1>
          <p className="text-xl text-blue-600">Félicitations au vainqueur</p>
        </header>

        {/* Winner Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8 mb-12 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-yellow-400">
                <AvatarImage src={winner.avatar} />
                <AvatarFallback className="text-4xl">
                  {winner.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-800 rounded-full p-2">
                <PartyPopper className="w-6 h-6" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{winner.name}</h2>
          <p className="text-gray-600">a remporté la victoire !</p>
        </motion.div>

        {/* Round History */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Historique des Rounds</h2>
          <div className="space-y-4">
            {roundHistory.map((round, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-16">Round {round.level}</span>
                  <span className="text-gray-500">Question #{round.questionId}</span>
                </div>
                {round.eliminatedPlayer ? (
                  <div className="flex items-center text-red-600">
                    <span className="mr-2">Éliminé :</span>
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarFallback className="text-xs">
                        {round.eliminatedPlayer.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{round.eliminatedPlayer.name}</span>
                  </div>
                ) : (
                  <span className="text-green-600">Aucune élimination</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={handleRevenge}
            className="bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 text-lg font-semibold"
          >
            Revenge
          </Button>
          <Button 
            onClick={handleBackToRooms}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 py-6 px-8 text-lg font-semibold"
          >
            Retour aux rooms
          </Button>
        </div>
      </div>
    </div>
  );
}
