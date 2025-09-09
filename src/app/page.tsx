'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressKPIs } from '@/components/progression/ProgressKPIs';
import { ProgressionGrid } from '@/components/progression/ProgressionGrid';
import { Button } from '@/components/ui/button';
import { LevelProgress, ThemeKey, getThemeDisplayName, getThemeEmoji } from '@/types/progression';

// Mock data - Replace with actual API calls
const useUserProgress = (): { data: { levels: LevelProgress[]; completionPercentage: number; totalTimeSpent: number } | null; isLoading: boolean } => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState<{ levels: LevelProgress[]; completionPercentage: number; totalTimeSpent: number } | null>(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const themeKeys: ThemeKey[] = ['fr', 'math', 'eng', 'hg', 'svt', 'chim', 'mus'];
      
      const levels: LevelProgress[] = [
        'CP', 'CE1', 'CE2', 'CM1', 'CM2', '6e', 
        '5e', '4e', '3e', '2nde', '1ère', 'Terminale'
      ].map((name, index) => ({
        id: `level-${index + 1}`,
        name,
        themes: themeKeys.map(themeKey => ({
          id: themeKey,
          name: getThemeDisplayName(themeKey),
          emoji: getThemeEmoji(themeKey),
          isCompleted: Math.random() > 0.7 // 30% chance of being completed
        }))
      }));

      const completedThemes = levels.flatMap(level => 
        level.themes.filter(theme => theme.isCompleted)
      ).length;
      
      const totalThemes = levels.length * themeKeys.length;
      const completionPercentage = Math.round((completedThemes / totalThemes) * 100);
      
      setProgress({
        levels,
        completionPercentage,
        totalTimeSpent: Math.floor(Math.random() * 10000) // Random time between 0-10000 seconds
      });
      
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { data: progress, isLoading };
};

export default function Home() {
  const router = useRouter();
  const { data: progress, isLoading } = useUserProgress();
  
  const handleThemeClick = (levelId: string, themeId: string) => {
    console.log(`Level ${levelId}, Theme ${themeId} clicked`);
    // Navigate to quiz or show modal
  };
  
  const handlePlayClick = () => {
    router.push('/select');
  };

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Votre progression</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Suivez votre avancement et continuez à apprendre
        </p>
        
        <Button 
          size="lg" 
          className="text-lg px-8 py-6"
          onClick={handlePlayClick}
        >
          Jouer maintenant
        </Button>
      </div>

      <ProgressKPIs 
        completionPercentage={progress?.completionPercentage || 0}
        totalTimeSpent={progress?.totalTimeSpent || 0}
        isLoading={isLoading}
        className="mt-8"
      />
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Niveaux et thèmes</h2>
        <ProgressionGrid 
          levels={progress?.levels || []} 
          isLoading={isLoading}
          onThemeClick={handleThemeClick}
        />
      </div>
    </div>
  );
}
