import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

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
      bounce: 0.4,
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

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
    <motion.div 
      className={cn(
        "glass rounded-2xl p-6 shadow-card hover-lift transition-all duration-300",
        className
      )}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
    >
      <motion.div 
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full mb-4",
          iconBg
        )}
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
      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
      <motion.p 
        className="text-muted-foreground text-sm"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            delay: 0.2,
            duration: 0.4,
            ease: "easeOut"
          }
        }}
        viewport={{ once: true }}
      >
        {children}
      </motion.p>
    </motion.div>
  );
}
