import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

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
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Transform Learning
            </span>
            <br />
            <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              With Interactive Quizzes
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Create, share, and track engaging quizzes that make learning fun and effective. Perfect for educators, students, and knowledge enthusiasts.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90">
              <Link href="/signup">
                Start Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/rooms">
                Browse Rooms
                <span className="sr-only">Browse public quiz rooms</span>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
