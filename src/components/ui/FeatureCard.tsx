import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
  iconBg?: string;
}

export function FeatureCard({
  icon,
  title,
  children,
  className,
  iconBg = "bg-primary/10 text-primary"
}: FeatureCardProps) {
  return (
    <div className={cn(
      "glass rounded-2xl p-6 shadow-card hover-lift transition-all duration-300",
      className
    )}>
      <div className={cn(
        "flex h-12 w-12 items-center justify-center rounded-full mb-4",
        iconBg
      )}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm">{children}</p>
    </div>
  );
}
