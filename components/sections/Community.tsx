'use client';

import { Users, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Community } from '@/data/portfolio';

export function CommunitySection({ community }: { community: Community[] }) {
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
    <section id="community" className="py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 flex justify-center items-center gap-3">
            <Users className="w-8 h-8 text-primary" /> Community & Mentorship
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Giving back to the community through mentorship and leadership.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {community.map((comm, idx) => (
            <motion.div key={idx} variants={itemVariants} className="bg-background rounded-3xl border border-border p-8 flex flex-col h-full shadow-sm hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-bold text-foreground mb-1">{comm.role}</h3>
              <div className="text-primary font-medium mb-6">{comm.organization}</div>
              
              <p className="text-muted-foreground text-sm mb-8 flex-1 whitespace-pre-line">
                {comm.description}
              </p>
              
              {comm.proof_url && (
                <a href={comm.proof_url} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors">
                  Learn More <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
