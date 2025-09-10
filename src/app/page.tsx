'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomeHero from "@/components/landing/HomeHero";
import { ProgressKPIs } from '@/components/progression/ProgressKPIs';
import { ProgressionGrid } from '@/components/progression/ProgressionGrid';
import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { CategoryCard } from '@/components/quiz/CategoryCard';
import { LevelProgress, ThemeKey, getThemeDisplayName, getThemeEmoji } from '@/types/progression';
import { Zap, Users, BarChart3, BookOpen, Atom, Globe, Music, Leaf, Code, Brain } from 'lucide-react';
import { Container } from '@/components/layout/Container';

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

  // Mock data for categories
  const categories = [
    { id: 1, name: 'Mathématiques', emoji: '🧮', level: 'Débutant', progress: 42 },
    { id: 2, name: 'Sciences', emoji: '🔬', level: 'Intermédiaire', progress: 68 },
    { id: 3, name: 'Histoire-Géo', emoji: '🌍', level: 'Avancé', progress: 23 },
    { id: 4, name: 'Français', emoji: '📚', level: 'Débutant', progress: 85 },
    { id: 5, name: 'Anglais', emoji: '🇬🇧', level: 'Intermédiaire', progress: 56 },
    { id: 6, name: 'Musique', emoji: '🎵', level: 'Débutant', progress: 31 },
  ];

  return (
    <>
      <HomeHero />
      
      <main>
        {/* Why EduQuiz Section */}
        <section className="section-y bg-muted/20">
          <Container>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Pourquoi choisir EduQuiz ?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Une plateforme complète pour un apprentissage interactif et efficace
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <FeatureCard
                icon={<Zap className="h-5 w-5" />}
                title="Configuration rapide"
                iconBg="bg-amber-500/10 text-amber-500"
              >
                Créez ou rejoignez une salle de quiz en quelques secondes. Aucune inscription compliquée nécessaire.
              </FeatureCard>
              
              <FeatureCard
                icon={<Users className="h-5 w-5" />}
                title="Salles en direct"
                iconBg="bg-blue-500/10 text-blue-500"
              >
                Jouez en temps réel avec vos amis ou collègues de classe. Résultats instantanés et classements en direct.
              </FeatureCard>
              
              <FeatureCard
                icon={<BarChart3 className="h-5 w-5" />}
                title="Analyses intelligentes"
                iconBg="bg-purple-500/10 text-purple-500"
              >
                Suivez vos progrès avec des statistiques détaillées et des recommandations personnalisées.
              </FeatureCard>
            </div>
          </Container>
        </section>

        {/* Popular Categories Section */}
        <section className="section-y">
          <Container>
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Catégories populaires
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Découvrez nos catégories les plus populaires et commencez à apprendre
              </p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  icon={<span className="text-2xl">{category.emoji}</span>}
                  title={category.name}
                  level={category.level}
                  progress={category.progress}
                  variant="accent"
                  className="group hover:border-accent/50 transition-colors"
                />
              ))}
            </div>
          </Container>
        </section>

        {/* Progress Section */}
        <section className="section-y bg-muted/20">
          <Container>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Ma Progression</h2>
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
          </Container>
        </section>
      </main>
    </>
  );
}
