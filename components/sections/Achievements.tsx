'use client';

import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Achievement } from '@/data/portfolio';

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion 
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="achievements" className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={variants}
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Key Achievements</h2>
            <p className="text-muted-foreground">Highlights, milestones, and competitive programming.</p>
          </div>
          
          <div className="bg-background rounded-3xl border border-border p-8 md:p-12 shadow-sm">
            <ul className="space-y-6">
              {achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-foreground font-medium leading-relaxed block text-lg">
                      {achievement.title}
                    </span>
                    {achievement.description && (
                      <p className="text-muted-foreground text-sm mt-1">{achievement.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
