import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export function Container({ 
  as: Component = 'div', 
  children, 
  className,
  ...props 
}: ContainerProps) {
  return (
    <Component 
      className={cn("mx-auto w-full max-w-7xl px-4 md:px-6", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
