import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
};

export function HomeHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-5 [mask-image:linear-gradient(0deg,transparent,black_20%)]" />
        <div className="absolute -left-1/3 top-0 h-[800px] w-[800px] -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-1/3 bottom-0 h-[800px] w-[800px] translate-y-1/2 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div 
          className="mx-auto max-w-4xl text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <motion.span 
              className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              variants={item}
            >
              Transform Learning
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent"
              variants={item}
            >
              With Interactive Quizzes
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            variants={item}
          >
            Create, share, and track engaging quizzes that make learning fun and effective. Perfect for educators, students, and knowledge enthusiasts.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                },
              },
            }}
          >
            <motion.div variants={item}>
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90">
                <Link href="/signup">
                  Start Now
                </Link>
              </Button>
            </motion.div>
            <motion.div variants={item}>
              <Button asChild variant="outline" size="lg">
                <Link href="/rooms">
                  Browse Rooms
                  <span className="sr-only">Browse public quiz rooms</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
