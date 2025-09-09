import { cn } from '@/lib/utils';

type QuestionCardProps = {
  question: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
  };
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  showFeedback: boolean;
};

export function QuestionCard({ question, selectedAnswer, onAnswerSelect, showFeedback }: QuestionCardProps) {
  const isCorrect = (index: number) => index === question.correctAnswer;
  
  const getButtonVariant = (index: number) => {
    if (!showFeedback) return 'outline';
    if (isCorrect(index)) return 'success';
    if (index === selectedAnswer) return 'destructive';
    return 'outline';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <h2 className="text-xl font-medium">{question.question}</h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const showFeedbackIcon = showFeedback && (isSelected || isCorrect(index));
          
          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              disabled={showFeedback && !isSelected}
              className={cn(
                'w-full p-4 rounded-2xl border-2 text-left transition-colors',
                'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none',
                'disabled:opacity-100',
                isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300',
                showFeedback && isCorrect(index) && 'border-green-500 bg-green-50',
                showFeedback && isSelected && !isCorrect(index) && 'border-red-500 bg-red-50'
              )}
              aria-pressed={isSelected}
              aria-describedby={showFeedback ? `feedback-${index}` : undefined}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showFeedbackIcon && (
                  <span className="text-lg" id={`feedback-${index}`}>
                    {isCorrect(index) ? '✅' : '❌'}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      
      {showFeedback && selectedAnswer !== null && !isCorrect(selectedAnswer) && (
        <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
          <p className="font-medium">Explication :</p>
          <p>La bonne réponse est : {question.options[question.correctAnswer]}</p>
        </div>
      )}
    </div>
  );
}
