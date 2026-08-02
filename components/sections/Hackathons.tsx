'use client';

import { Trophy, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Hackathon } from '@/data/portfolio';
import Image from 'next/image';

export function HackathonsSection({ hackathons }: { hackathons: Hackathon[] }) {
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
    <section id="hackathons" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 flex justify-center items-center gap-3">
            <Trophy className="w-8 h-8 text-primary" /> Hackathons
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building innovative solutions under pressure.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {hackathons.map((hackathon, idx) => (
            <motion.div key={idx} variants={itemVariants} className="bg-background rounded-3xl border border-border p-6 md:p-8 flex flex-col gap-8 shadow-sm hover:shadow-md transition-shadow">
              
              <div className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{hackathon.project}</h3>
                    <div className="text-primary font-medium">{hackathon.event}</div>
                  </div>
                  
                  {hackathon.result && (
                    <div className="bg-amber-500/10 text-amber-500 font-bold px-4 py-2 rounded-full text-sm flex items-center gap-2">
                      <Trophy className="w-4 h-4" /> {hackathon.result}
                    </div>
                  )}
                </div>

                <div className="text-muted-foreground text-sm mb-6 space-y-4">
                  <p><strong className="text-foreground">Problem:</strong> {hackathon.problem}</p>
                  <p><strong className="text-foreground">Solution:</strong> {hackathon.solution}</p>
                  <p><strong className="text-foreground">Contribution:</strong> {hackathon.contribution}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hackathon.tech_stack.map((tag: string, tIdx: number) => (
                    <span key={tIdx} className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {hackathon.proof_url && (
                  <a href={hackathon.proof_url} target="_blank" rel="noreferrer" className="text-primary text-sm font-bold hover:underline inline-flex items-center gap-2 mt-2">
                    View Project <Trophy className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
