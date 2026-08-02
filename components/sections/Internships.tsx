'use client';

import { ExternalLink, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Internship } from '@/data/portfolio';

export function Internships({ internships }: { internships: Internship[] }) {
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
    <section id="internships" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Internships & Simulations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practical experience gained through job simulations and internships.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {internships.map((internship, idx) => (
            <motion.div key={idx} variants={itemVariants} className="bg-background p-8 rounded-3xl border border-border shadow-sm flex flex-col h-full hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-bold text-foreground">{internship.role}</h3>
              <div className="text-primary font-medium mb-4">{internship.company}</div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 text-sm text-muted-foreground border-b border-border pb-6">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> 
                  {internship.start_date} - {internship.end_date}
                </span>
                {internship.is_virtual && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> Remote / Virtual
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground text-sm mb-6 flex-1 whitespace-pre-line">
                {internship.description}
              </p>
              
              <div className="flex flex-col gap-4 mt-auto">
                {internship.skills && (
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((tag: string, tIdx: number) => (
                      <span key={tIdx} className="px-2.5 py-1 bg-muted rounded-md text-xs font-medium text-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {internship.certificate_url && (
                  <a href={internship.certificate_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline w-fit">
                    View Certificate <ExternalLink className="w-4 h-4" />
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
