import { Suspense } from 'react';
import { QuizContainer } from '@/components/quiz/QuizContainer';
import { QuizLoading } from '@/components/quiz/QuizLoading';

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<QuizLoading />}>
        <QuizContainer />
      </Suspense>
    </div>
  );
}
