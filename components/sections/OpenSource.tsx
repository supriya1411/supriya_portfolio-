'use client';

import { GitPullRequest, Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { OpenSource } from '@/data/portfolio';
import { cn } from '@/lib/utils';

export function OpenSourceSection({ opensource }: { opensource: OpenSource[] }) {
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
    <section id="opensource" className="py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 flex justify-center items-center gap-3">
            <GitPullRequest className="w-8 h-8 text-primary" /> Open Source
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contributing to the community and building tools for other developers.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {opensource.map((repo, idx) => (
            <motion.div key={idx} variants={itemVariants} className="bg-background rounded-3xl border border-border p-6 flex flex-col h-full hover:border-primary/50 transition-colors shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <a href={repo.link} target="_blank" rel="noreferrer" className="text-xl font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg> {repo.repository}
                </a>
                <span className={cn(
                  "text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider",
                  repo.status === 'MERGED' ? "bg-green-500/10 text-green-500" :
                  repo.status === 'OPEN' ? "bg-blue-500/10 text-blue-500" :
                  "bg-muted text-muted-foreground"
                )}>
                  {repo.status}
                </span>
              </div>
              
              <p className="text-muted-foreground text-sm mb-6 flex-1">
                {repo.contribution}
              </p>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  {repo.pr_issue_title}
                </div>
                
                {repo.link && (
                  <a href={repo.link} target="_blank" rel="noreferrer" className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                    View PR <ExternalLink className="w-3 h-3" />
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
