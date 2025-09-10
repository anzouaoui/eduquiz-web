import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const cardVariants: Variants = {
  offscreen: {
    y: 20,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const progressBarVariants: Variants = {
  hidden: { width: 0 },
  visible: (progress: number) => ({
    width: `${progress}%`,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      delay: 0.2
    }
  })
};

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
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:shadow-card",
        variantClasses[variant],
        className
      )}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 text-foreground/80"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ 
              scale: 1, 
              opacity: 1,
              transition: { 
                delay: 0.1,
                duration: 0.4,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true }}
          >
            {icon}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              transition: { 
                delay: 0.15,
                duration: 0.4,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true }}
          >
            <h3 className="font-medium text-foreground">{title}</h3>
            <Badge variant={badgeVariants[variant]} className="mt-1 text-xs">
              {level}
            </Badge>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="mt-4"
        initial={{ opacity: 0 }}
        whileInView={{ 
          opacity: 1,
          transition: { 
            delay: 0.2,
            duration: 0.4,
            ease: "easeOut"
          }
        }}
        viewport={{ once: true }}
      >
        <div className="mb-1 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <motion.span 
            className="font-medium text-foreground/80"
            initial={{ opacity: 0 }}
            whileInView={{ 
              opacity: 1,
              transition: { 
                delay: 0.3,
                duration: 0.4,
                ease: "easeOut"
              }
            }}
            viewport={{ once: true }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <motion.div
            className={cn(
              "h-full rounded-full",
              {
                "bg-primary": variant === "default",
                "bg-secondary": variant === "secondary",
                "bg-accent": variant === "accent",
              }
            )}
            initial="hidden"
            whileInView="visible"
            custom={progress}
            variants={progressBarVariants}
            viewport={{ once: true }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
