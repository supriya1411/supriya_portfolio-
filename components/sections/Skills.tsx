'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useMemo } from 'react';
import { Skill } from '@/data/portfolio';

export function Skills({ skills }: { skills: Skill[] }) {
  const prefersReducedMotion = useReducedMotion();
  
  const skillCategories = useMemo(() => {
    const categories: Record<string, Set<string>> = {};
    skills.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = new Set();
      }
      categories[skill.category].add(skill.name);
    });
    
    return Object.entries(categories).map(([title, skillSet]) => ({ 
      title, 
      skills: Array.from(skillSet) 
    }));
  }, [skills]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 }
    }
  };

  const itemVariants = prefersReducedMotion 
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Technical Arsenal</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of the tools, languages, and frameworks I use to build digital products.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {skillCategories.map((category, idx) => (
            <motion.div key={idx} variants={itemVariants} className="p-8 rounded-3xl bg-muted/30 border border-border">
              <h3 className="text-xl font-semibold mb-6 text-foreground">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="px-4 py-2 rounded-full bg-background border border-border/60 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
