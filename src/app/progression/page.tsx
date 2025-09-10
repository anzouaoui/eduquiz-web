'use client';

import { useState, useEffect } from 'react';
import { LevelProgress, ThemeKey, getThemeDisplayName, getThemeEmoji } from '@/types/progression';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock data - Same as in the home page
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

export default function ProgressionPage() {
  const { data: progressData, isLoading } = useUserProgress();

  if (isLoading || !progressData) {
    return (
      <section className="section-y">
        <Container>
          <div className="flex h-96 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </Container>
      </section>
    );
  }

  const { levels, completionPercentage } = progressData;

  return (
    <section className="section-y">
      <Container>
        <div className="mb-10 text-center">
          <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Ma Progression
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Suivez votre avancement à travers les différents niveaux et matières
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {levels.map((level) => {
            const completedThemes = level.themes.filter(theme => theme.isCompleted).length;
            const progress = Math.round((completedThemes / level.themes.length) * 100);
            
            return (
              <div 
                key={level.id}
                className="glass hover-lift group flex flex-col rounded-2xl p-5 shadow-card transition-all duration-300"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">{level.name}</h3>
                  <Badge variant={progress === 100 ? 'success' : 'secondary'}>
                    {completedThemes}/{level.themes.length} Matières
                  </Badge>
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progression</span>
                    <span className="font-medium text-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="mt-auto pt-3">
                  <div className="flex flex-wrap gap-2">
                    {level.themes.map((theme) => (
                      <Badge 
                        key={theme.id}
                        variant={theme.isCompleted ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {theme.emoji} {theme.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
