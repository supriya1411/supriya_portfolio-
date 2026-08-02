'use client';

import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Education } from '@/data/portfolio';

export function EducationSection({ education }: { education: Education[] }) {
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
    <section id="education" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 flex justify-center items-center gap-3">
            <GraduationCap className="w-8 h-8 text-primary" /> Education
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Academic background and formal education.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {education.map((edu, idx) => (
            <motion.div key={idx} variants={itemVariants} className="bg-background rounded-3xl border border-border p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{edu.degree}</h3>
                  <div className="text-primary font-medium text-lg">{edu.university}</div>
                </div>
                
                <div className="bg-muted px-4 py-2 rounded-full text-sm font-bold text-foreground shrink-0 border border-border">
                  CGPA: {edu.cgpa}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {edu.start_date} - {edu.end_date}</span>
              </div>
              
              {edu.coursework && edu.coursework.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Key Coursework</h4>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
                    {edu.coursework.map((course, aIdx) => (
                      <li key={aIdx}>{course}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
