'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Profile } from '@/data/portfolio';

export function About({ profile }: { profile: Profile }) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion 
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={variants}
        >
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">About Me</h2>
            <div className="h-1 w-20 bg-primary/20 rounded-full"></div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert text-muted-foreground whitespace-pre-line">
            <p className="mb-8">
              {profile.summary}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {profile.stats.map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-background border border-border flex flex-col items-center text-center shadow-sm">
                <span className="text-3xl font-bold text-foreground mb-2">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
