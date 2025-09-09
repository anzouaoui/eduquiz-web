'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface Player {
  id: string;
  name: string;
  avatar?: string;
  isAlive: boolean;
  timeMs?: number;
  isCorrect?: boolean;
}

interface Question {
  id: string;
  text: string;
  answers: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  round: number;
  totalRounds: number;
  timeLimit: number;
}

export default function LiveRoomPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [players, setPlayers] = useState<Player[]>([]);
  const [eliminatedPlayer, setEliminatedPlayer] = useState<Player | null>(null);
  const [perfectTie, setPerfectTie] = useState(false);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchQuestion = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock question data
      const mockQuestion: Question = {
        id: '1',
        text: 'Quelle est la capitale de la France?',
        answers: [
          { id: '1', text: 'Londres', isCorrect: false },
          { id: '2', text: 'Paris', isCorrect: true },
          { id: '3', text: 'Berlin', isCorrect: false },
          { id: '4', text: 'Madrid', isCorrect: false },
        ],
        round: 1,
        totalRounds: 12,
        timeLimit: 30,
      };

      // Mock players data
      const mockPlayers: Player[] = [
        { id: '1', name: 'You', isAlive: true, timeMs: 1200, isCorrect: true },
        { id: '2', name: 'Alice', isAlive: true, timeMs: 1800, isCorrect: true },
        { id: '3', name: 'Bob', isAlive: true, timeMs: 2000, isCorrect: false },
      ];

      setCurrentQuestion(mockQuestion);
      setPlayers(mockPlayers);
      setTimeLeft(mockQuestion.timeLimit);
      setEliminatedPlayer({ id: '4', name: 'Charlie', isAlive: false });
      setPerfectTie(true);
    };

    fetchQuestion();
  }, [id]);

  // Timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (answerId: string) => {
    if (isAnswerLocked) return;
    
    setSelectedAnswer(answerId);
    setIsAnswerLocked(true);
    
    // Simulate answer processing
    setTimeout(() => {
      // Here you would typically send the answer to your backend
      // and update the player's status based on the response
      
      // For now, we'll just simulate a response
      const isCorrect = currentQuestion?.answers.find(a => a.id === answerId)?.isCorrect || false;
      
      // Update player's status
      setPlayers(prevPlayers => 
        prevPlayers.map(player => 
          player.id === '1' 
            ? { ...player, isCorrect, timeMs: 1500 } 
            : player
        )
      );
      
      // Simulate navigation to next question after a delay
      setTimeout(() => {
        // This would be replaced with actual navigation logic
        // router.push(`/rooms/${id}/summary`);
      }, 3000);
    }, 500);
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement de la question...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">
              Manche {currentQuestion.round}/{currentQuestion.totalRounds}
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium">{timeLeft}s</span>
              <Progress value={(timeLeft / currentQuestion.timeLimit) * 100} className="w-32 h-2" />
            </div>
          </div>
          
          {/* Elimination Banners */}
          {eliminatedPlayer && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
              <p>Éliminé : @{eliminatedPlayer.name}</p>
            </div>
          )}
          
          {perfectTie && (
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
              <p>Égalité parfaite — personne éliminée</p>
            </div>
          )}
        </header>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.answers.map((answer) => {
              const isSelected = selectedAnswer === answer.id;
              let buttonClass = 'w-full p-4 rounded-lg text-left transition-colors ';
              
              if (isAnswerLocked) {
                if (answer.isCorrect) {
                  buttonClass += 'bg-green-100 border-2 border-green-500';
                } else if (isSelected) {
                  buttonClass += 'bg-red-100 border-2 border-red-500';
                } else {
                  buttonClass += 'bg-gray-100';
                }
              } else {
                buttonClass += 'bg-white border-2 border-gray-200 hover:border-blue-500';
              }
              
              return (
                <button
                  key={answer.id}
                  className={buttonClass}
                  onClick={() => handleAnswerSelect(answer.id)}
                  disabled={isAnswerLocked}
                >
                  {answer.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Players Sidebar */}
      <div className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <h3 className="font-semibold mb-4">Joueurs ({players.length})</h3>
        <div className="space-y-3">
          {players.map((player) => (
            <div 
              key={player.id} 
              className={`flex items-center justify-between p-2 rounded-md ${!player.isAlive ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={player.avatar} />
                  <AvatarFallback>{player.name[0]}</AvatarFallback>
                </Avatar>
                <span className={player.id === '1' ? 'font-semibold' : ''}>
                  {player.name} {player.id === '1' && '(Vous)'}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {player.timeMs && (
                  <span className="text-sm text-gray-500">
                    {(player.timeMs / 1000).toFixed(1)}s
                  </span>
                )}
                {isAnswerLocked && (
                  <span className={`text-sm ${player.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {player.isCorrect ? '✓' : '✗'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
