import { Progress } from '@/components/ui/progress';

type QuizTopBarProps = {
  level: string;
  theme: string;
  currentQuestion: number;
  totalQuestions: number;
};

export function QuizTopBar({ level, theme, currentQuestion, totalQuestions }: QuizTopBarProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold capitalize">{theme}</h1>
          <p className="text-sm text-gray-500">Niveau: {level}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">
            Question {currentQuestion} sur {totalQuestions}
          </div>
          <div className="text-sm font-medium">
            {/* Timer would go here */}
            <span className="text-blue-600">02:30</span>
          </div>
        </div>
      </div>
      
      <Progress value={progress} className="h-2" />
    </div>
  );
}
