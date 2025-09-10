"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

export default function ResultPage() {
  // Mock data - replace with actual data from your state management
  const score = 8; // Example score
  const totalQuestions = 10;
  const passed = score >= 8;
  
  // Mock questions data
  const questions = Array(10).fill(0).map((_, i) => ({
    id: i + 1,
    question: `Question ${i + 1}: What is the capital of country ${i + 1}?`,
    correct: i % 3 !== 0, // Mock some correct/incorrect answers
    correctAnswer: `Answer ${i + 1}`,
    explanation: i % 4 === 0 ? `This is an explanation for question ${i + 1}` : undefined
  }));

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'My Quiz Results',
        text: `I scored ${score}/${totalQuestions} on this quiz!`,
        url: window.location.href,
      });
    } catch (err) {
      console.error('Error sharing:', err);
      // Fallback for browsers that don't support Web Share API
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Quiz Results</CardTitle>
            <div className="mt-4">
              <div className="text-5xl font-bold mb-2">
                {score}/{totalQuestions}
              </div>
              <Badge variant={passed ? 'success' : 'destructive'} className="text-lg">
                {passed ? 'Validé' : 'Non validé'}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <h2 className="text-xl font-semibold">Récapitulatif des réponses</h2>
            <div className="space-y-4">
              {questions.map((q) => (
                <div key={q.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    {q.correct ? (
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium line-clamp-1">{q.question}</p>
                      <p className="text-sm text-muted-foreground">Réponse correcte: {q.correctAnswer}</p>
                      {q.explanation && (
                        <p className="text-sm mt-1 text-muted-foreground italic">
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button asChild variant="outline">
              <Link href="/quiz">Rejouer</Link>
            </Button>
            <Button asChild>
              <Link href="/select">Choisir un autre thème</Link>
            </Button>
            <Button variant="secondary" onClick={handleShare}>
              Partager
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
