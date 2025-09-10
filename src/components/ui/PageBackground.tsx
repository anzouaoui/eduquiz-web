import { cn } from "@/lib/utils";

interface PageBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  children: React.ReactNode;
  className?: string;
}

export function PageBackground({ 
  variant = 'primary', 
  children, 
  className,
  ...props 
}: PageBackgroundProps) {
  const variantClasses = {
    primary: 'before:bg-primary/5 after:bg-primary/10',
    secondary: 'before:bg-secondary/5 after:bg-secondary/10',
    accent: 'before:bg-accent/5 after:bg-accent/10',
  };

  return (
    <div 
      className={cn(
        'relative min-h-screen w-full overflow-hidden',
        'before:absolute before:inset-0 before:-z-10 before:bg-grid before:opacity-5',
        'after:absolute after:inset-0 after:-z-20 after:opacity-10',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {/* Radial gradient blobs */}
      <div 
        className={cn(
          'fixed -z-10 h-[800px] w-[800px] rounded-full blur-[100px]',
          'opacity-20',
          variant === 'primary' && 'bg-primary -left-1/3 -top-1/3',
          variant === 'secondary' && 'bg-secondary -right-1/3 -bottom-1/3',
          variant === 'accent' && 'bg-accent -right-1/3 -top-1/3',
        )}
        aria-hidden="true"
      />
      <div 
        className={cn(
          'fixed -z-10 h-[800px] w-[800px] rounded-full blur-[100px]',
          'opacity-20',
          variant === 'primary' && 'bg-secondary -right-1/3 -bottom-1/3',
          variant === 'secondary' && 'bg-primary -left-1/3 -top-1/3',
          variant === 'accent' && 'bg-secondary -left-1/3 -bottom-1/3',
        )}
        aria-hidden="true"
      />
      
      {children}
    </div>
  );
}
