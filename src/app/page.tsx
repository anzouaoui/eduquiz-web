'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HomeHero } from '@/components/landing/HomeHero';
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
  const { data: progressData, isLoading } = useUserProgress();

  if (isLoading || !progressData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const { levels, completionPercentage, totalTimeSpent } = progressData;

  return (
    <>
      <HomeHero />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ma Progression</h1>
            <p className="text-muted-foreground">
              Suivez votre avancement dans les différents thèmes
            </p>
          </div>
          <Button onClick={() => router.push('/practice')}>
            Nouvelle séance
          </Button>
        </div>

        <ProgressKPIs 
          completionPercentage={completionPercentage} 
          totalTimeSpent={totalTimeSpent} 
        />
        
        <ProgressionGrid levels={levels} />
      </main>
    </>
  );
}
