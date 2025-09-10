"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      // ⬇️ Remplace la string par une courbe cubic-bezier
      ease: [0.22, 1, 0.36, 1], // = easeOutQuint-like
    },
  },
};

export default function HomeHero() {
  return (
    <section className="relative section-y">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Transform Learning
            </span>
          </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Interactive rooms, real-time results, and a delightful experience.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex items-center justify-center gap-3"
            >
              {/* CTA buttons */}
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
