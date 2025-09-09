import { cn } from "@/lib/utils";

interface ProgressKPIsProps {
  completionPercentage: number;
  totalTimeSpent: number; // in seconds
  isLoading?: boolean;
  className?: string;
}

export function ProgressKPIs({ 
  completionPercentage, 
  totalTimeSpent, 
  isLoading, 
  className 
}: ProgressKPIsProps) {
  if (isLoading) {
    return (
      <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 mb-8", className)}>
        <div className="bg-muted/50 rounded-lg p-4 animate-pulse">
          <div className="h-6 w-1/2 bg-muted rounded mb-2"></div>
          <div className="h-8 w-3/4 bg-muted rounded"></div>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 animate-pulse">
          <div className="h-6 w-1/2 bg-muted rounded mb-2"></div>
          <div className="h-8 w-3/4 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 mb-8", className)}>
      <div className="bg-muted/50 rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-1">Progression globale</p>
        <div className="flex items-center gap-4">
          <div className="relative h-3 flex-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <span className="font-semibold whitespace-nowrap">{Math.round(completionPercentage)}%</span>
        </div>
      </div>
      
      <div className="bg-muted/50 rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-1">Temps cumulé</p>
        <p className="text-2xl font-bold">{formatTime(totalTimeSpent)}</p>
      </div>
    </div>
  );
}
