'use client';

import { Code2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { CodingProfile } from '@/data/portfolio';

export function CodingProfilesSection({ profiles }: { profiles: CodingProfile[] }) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.15 }
    }
  };

  const itemVariants = prefersReducedMotion 
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="coding-profiles" className="py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 flex justify-center items-center gap-3">
            <Code2 className="w-8 h-8 text-primary" /> Coding Profiles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My progress and statistics across various competitive programming platforms.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {profiles.map((profile, idx) => (
            <motion.div key={idx} variants={itemVariants} className="bg-background rounded-3xl border border-border p-8 flex flex-col items-center text-center hover:border-primary/50 transition-colors shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-2">{profile.platform}</h3>
              <div className="text-sm font-medium text-muted-foreground mb-6">@{profile.username}</div>
              
              <div className="text-2xl font-bold text-primary mb-6">{profile.stats}</div>
              
              <a href={profile.url} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                View Profile <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
