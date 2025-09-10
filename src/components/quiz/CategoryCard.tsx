import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CategoryCardProps {
  icon: ReactNode;
  title: string;
  level: string;
  progress: number; // 0-100
  variant?: "default" | "secondary" | "accent";
  className?: string;
}

export function CategoryCard({
  icon,
  title,
  level,
  progress,
  variant = "default",
  className,
}: CategoryCardProps) {
  const variantClasses = {
    default: "border-border/50 hover:border-primary/30",
    secondary: "border-secondary/20 hover:border-secondary/40",
    accent: "border-accent/20 hover:border-accent/40",
  };

  const badgeVariants = {
    default: "secondary",
    secondary: "secondary",
    accent: "accent",
  } as const;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:shadow-card",
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 text-foreground/80">
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-foreground">{title}</h3>
            <Badge variant={badgeVariants[variant]} className="mt-1 text-xs">
              {level}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground/80">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              {
                "bg-primary": variant === "default",
                "bg-secondary": variant === "secondary",
                "bg-accent": variant === "accent",
              }
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
