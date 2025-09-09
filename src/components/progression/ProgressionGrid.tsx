import { LevelProgress, ThemeProgress } from "@/types/progression";
import { cn } from "@/lib/utils";

interface ProgressionGridProps {
  levels: LevelProgress[];
  isLoading?: boolean;
  onThemeClick?: (levelId: string, themeId: string) => void;
}

export function ProgressionGrid({ levels, isLoading, onThemeClick }: ProgressionGridProps) {
  if (isLoading) {
    return <ProgressionGridSkeleton />;
  }

  if (!levels.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Commencez votre aventure éducative !</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {levels.map((level) => (
        <div 
          key={level.id}
          className="border rounded-lg p-4 hover:bg-accent/30 transition-colors"
        >
          <h3 className="font-semibold text-lg mb-3 text-center">{level.name}</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {level.themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onThemeClick?.(level.id, theme.id)}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-xl",
                  "transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  theme.isCompleted 
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-muted hover:bg-muted/80"
                )}
                aria-label={`${theme.name} - ${theme.isCompleted ? 'Validé' : 'Non validé'}`}
                aria-pressed={theme.isCompleted}
                title={theme.name}
              >
                {theme.emoji}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgressionGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 animate-pulse">
          <div className="h-6 bg-muted rounded w-3/4 mx-auto mb-4"></div>
          <div className="flex flex-wrap gap-2 justify-center">
            {[...Array(7)].map((_, j) => (
              <div key={j} className="w-10 h-10 rounded-full bg-muted"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
