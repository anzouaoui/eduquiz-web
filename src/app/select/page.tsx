'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from '@/components/ui/toaster';
import { useToaster } from '@/components/ui/toaster';
import { ThemeKey, getThemeDisplayName, getThemeEmoji } from '@/types/progression';

// Mock data - replace with actual API calls
const LEVELS = [
  'CP', 'CE1', 'CE2', 'CM1', 'CM2', '6e',
  '5e', '4e', '3e', '2nde', '1ère', 'Terminale'
];

const THEMES: { id: ThemeKey; name: string; emoji: string }[] = [
  { id: 'fr', name: 'Français', emoji: '🇫🇷' },
  { id: 'math', name: 'Mathématiques', emoji: '🔢' },
  { id: 'eng', name: 'Anglais', emoji: '🇬🇧' },
  { id: 'hg', name: 'Histoire-Géo', emoji: '🌍' },
  { id: 'svt', name: 'SVT', emoji: '🔬' },
  { id: 'chim', name: 'Chimie', emoji: '🧪' },
  { id: 'mus', name: 'Musique', emoji: '🎵' },
];

// Mock function to get available questions count
const getAvailableQuestionsCount = (level: string, theme: string): number => {
  // In a real app, this would be an API call
  const randomCount = Math.floor(Math.random() * 91) + 10; // Random between 10-100
  return randomCount;
};

export default function QuizSelectPage() {
  const router = useRouter();
  const { toast } = useToaster();
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [availableQuestions, setAvailableQuestions] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update available questions count when level or theme changes
  useEffect(() => {
    if (selectedLevel && selectedTheme) {
      setIsLoading(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        const count = getAvailableQuestionsCount(selectedLevel, selectedTheme);
        setAvailableQuestions(count);
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setAvailableQuestions(null);
    }
  }, [selectedLevel, selectedTheme]);

  const handleStartQuiz = () => {
    if (!selectedLevel || !selectedTheme) return;
    
    if (availableQuestions && availableQuestions < 10) {
      toast({
        title: 'Pas assez de questions disponibles',
        description: `Il n'y a que ${availableQuestions} questions disponibles pour cette sélection.`, 
        variant: 'destructive'
      });
      return;
    }
    
    // In a real app, we would navigate to the quiz page with the selected parameters
    router.push(`/quiz?level=${selectedLevel}&theme=${selectedTheme}&count=10`);
  };

  const isStartDisabled = !selectedLevel || !selectedTheme || isLoading;

  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Choisissez votre quiz</h1>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="level-select" className="block text-sm font-medium">
            Niveau scolaire
          </label>
          <Select 
            value={selectedLevel} 
            onValueChange={(value) => {
              setSelectedLevel(value);
              setSelectedTheme(''); // Reset theme when level changes
            }}
          >
            <SelectTrigger id="level-select" className="w-full">
              <SelectValue placeholder="Sélectionnez un niveau" />
            </SelectTrigger>
            <SelectContent>
              {LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label htmlFor="theme-select" className="block text-sm font-medium">
            Thème
          </label>
          <Select 
            value={selectedTheme} 
            onValueChange={setSelectedTheme}
            disabled={!selectedLevel}
          >
            <SelectTrigger id="theme-select" className="w-full">
              <SelectValue placeholder={selectedLevel ? "Sélectionnez un thème" : "Sélectionnez d'abord un niveau"} />
            </SelectTrigger>
            <SelectContent>
              {THEMES.map((theme) => (
                <SelectItem key={theme.id} value={theme.id}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{theme.emoji}</span>
                    <span>{theme.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {availableQuestions !== null && (
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Questions disponibles : <span className="font-medium">{availableQuestions}/100</span>
            </p>
          </div>
        )}

        <div className="pt-4">
          <Button 
            onClick={handleStartQuiz}
            disabled={isStartDisabled}
            className="w-full py-6 text-lg"
          >
            {isLoading ? (
              'Chargement...'
            ) : (
              'Lancer 10 questions'
            )}
          </Button>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
}
