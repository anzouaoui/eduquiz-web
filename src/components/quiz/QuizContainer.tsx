'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { QuizTopBar } from '@/components/quiz/QuizTopBar';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
};

type QuizParams = {
  level: string;
  theme: string;
  totalQuestions?: number;
};

export function QuizContainer() {
  const searchParams = useSearchParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizParams, setQuizParams] = useState<QuizParams | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);

  // Mock data - replace with actual API call
  const mockQuestions: Question[] = [
    {
      id: '1',
      question: 'Quelle est la capitale de la France?',
      options: ['Londres', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2,
      explanation: 'Paris est la capitale de la France.'
    },
    // Add more questions as needed
  ];

  useEffect(() => {
    // In a real app, fetch questions based on level and theme
    const level = searchParams.get('level');
    const theme = searchParams.get('theme');
    
    if (!level || !theme) {
      setError('Niveau ou thème non spécifié');
      setIsLoading(false);
      return;
    }

    setQuizParams({
      level,
      theme,
      totalQuestions: 10 // Default value
    });

    // Simulate API call
    const timer = setTimeout(() => {
      try {
        // In a real app: const response = await fetch(`/api/quiz?level=${level}&theme=${theme}`);
        // const data = await response.json();
        // setQuestions(data.questions);
        
        setQuestions(mockQuestions);
        setIsLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement du quiz');
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (hasAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setHasAnswered(true);
    
    const isCorrect = answerIndex === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Show feedback
    toast({
      title: isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse',
      description: questions[currentQuestionIndex].explanation,
      variant: isCorrect ? 'default' : 'destructive',
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      // Quiz completed
      toast({
        title: 'Quiz terminé !',
        description: `Votre score: ${score}/${questions.length}`,
      });
    }
  };

  if (isLoading) {
    return <QuizLoading />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {quizParams && (
        <QuizTopBar 
          level={quizParams.level}
          theme={quizParams.theme}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={quizParams.totalQuestions || 10}
        />
      )}
      
      <div className="mt-8">
        <QuestionCard 
          question={questions[currentQuestionIndex]}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          showFeedback={hasAnswered}
        />
        
        <div className="mt-8 flex justify-end">
          <Button 
            onClick={handleNextQuestion}
            disabled={!hasAnswered}
            className="min-w-[200px]"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Question suivante' : 'Terminer le quiz'}
          </Button>
        </div>
      </div>
    </div>
  );
}
