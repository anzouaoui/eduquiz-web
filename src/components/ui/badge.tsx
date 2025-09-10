import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-primary/20",
        secondary: "bg-secondary text-secondary-foreground border-secondary/20",
        accent: "bg-accent text-accent-foreground border-accent/20",
        destructive: "bg-destructive text-destructive-foreground border-destructive/20",
        success: "bg-success text-success-foreground border-success/20",
        outline: "border border-input bg-transparent hover:bg-accent/10 text-foreground",
        ghost: "bg-transparent text-foreground hover:bg-accent/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { badgeVariants };
