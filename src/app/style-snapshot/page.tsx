'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, BookOpen, BarChart3, Zap, Users, Book, Atom, Globe, Music, Code, Brain } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { Footer } from '@/components/layout/Footer';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { CategoryCard } from '@/components/quiz/CategoryCard';
import { Button } from '@/components/ui/button';

// Mock data for the style snapshot
const features = [
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: 'Apprentissage Personnalisé',
    description: 'Des quiz adaptés à votre niveau et à votre rythme d\'apprentissage.'
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Contenu Complet',
    description: 'Couvre tous les sujets du programme scolaire français.'
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Suivi des Progrès',
    description: 'Visualisez votre amélioration avec des statistiques détaillées.'
  }
];

const categories = [
  {
    icon: <Book className="h-6 w-6" />,
    title: 'Français',
    level: 'Intermédiaire',
    progress: 75,
    variant: 'default' as const
  },
  {
    icon: <Atom className="h-6 w-6" />,
    title: 'Physique-Chimie',
    level: 'Avancé',
    progress: 90,
    variant: 'secondary' as const
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Histoire-Géo',
    level: 'Débutant',
    progress: 30,
    variant: 'accent' as const
  },
  {
    icon: <Music className="h-6 w-6" />,
    title: 'Musique',
    level: 'Intermédiaire',
    progress: 60,
    variant: 'default' as const
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: 'Informatique',
    level: 'Avancé',
    progress: 85,
    variant: 'secondary' as const
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: 'Philosophie',
    level: 'Débutant',
    progress: 25,
    variant: 'accent' as const
  }
];

export default function StyleSnapshot() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-background to-muted/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Découvrez le futur de l&apos;apprentissage
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Une nouvelle façon d&apos;apprendre, plus engageante et plus efficace que jamais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base">
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="text-base">
                En savoir plus
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              Pourquoi choisir EduQuiz ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez les fonctionnalités qui font de nous la référence de l&apos;apprentissage en ligne.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, margin: "-100px" }}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  className="h-full"
                >
                  {feature.description}
                </FeatureCard>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-muted/20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4">
              Explorez nos catégories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trouvez le sujet qui vous passionne et commencez à apprendre dès maintenant.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, margin: "-100px" }}
              >
                <CategoryCard
                  icon={category.icon}
                  title={category.title}
                  level={category.level}
                  progress={category.progress}
                  variant={category.variant}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <Container>
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Prêt à révolutionner votre façon d&apos;apprendre ?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Rejoignez des milliers d&apos;étudiants qui améliorent déjà leurs résultats avec EduQuiz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-base font-medium"
                asChild
              >
                <Link href="/signup">
                  S&apos;inscrire gratuitement
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-base font-medium text-white border-white/30 hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/about">
                  En savoir plus
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <Footer className="mt-auto" />
    </div>
  );
}
