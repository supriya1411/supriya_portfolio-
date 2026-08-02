'use client';

import { ExternalLink, X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Project as ProjectType } from '@/data/portfolio';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

export function Projects({ projects }: { projects: ProjectType[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  
  const categories = useMemo(() => {
    const cats = new Set(projects.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter(p => p.category === filter);
  }, [projects, filter]);

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
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            A selection of my best work, demonstrating architectural thinking, clean code, and user-centric design.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                  filter === cat 
                    ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                    : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          key={filter}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {filteredProjects.map((project, idx) => (
            <motion.div 
              key={project.id} 
              variants={itemVariants} 
              className="group bg-background rounded-3xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <Image 
                  src={project.cover_image_url || '/placeholder-project.jpg'} 
                  alt={project.title} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <span className="text-white font-medium px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">View Details</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-3 text-foreground">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech_stack.slice(0, 4).map((tag: string, tIdx: number) => (
                    <span key={tIdx} className="text-xs font-medium px-2.5 py-1 bg-muted text-muted-foreground rounded-md">
                      {tag}
                    </span>
                  ))}
                  {project.tech_stack.length > 4 && (
                    <span className="text-xs font-medium px-2.5 py-1 bg-muted text-muted-foreground rounded-md">
                      +{project.tech_stack.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-background border border-border rounded-3xl shadow-2xl overflow-y-auto z-10 flex flex-col"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur rounded-full text-muted-foreground hover:text-foreground border border-border z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[21/9] w-full bg-muted">
                <Image 
                  src={selectedProject.cover_image_url || '/placeholder-project.jpg'} 
                  alt={selectedProject.title} 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-bold text-foreground drop-shadow-sm">{selectedProject.title}</h3>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-8 flex-1">
                <div className="flex flex-wrap gap-4">
                  {selectedProject.github_url && (
                    <a href={selectedProject.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors">
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg> Source Code
                    </a>
                  )}
                  {selectedProject.live_url && (
                    <a href={selectedProject.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-foreground">Overview</h4>
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-foreground">Problem Statement</h4>
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {selectedProject.problem_statement}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-foreground">Solution</h4>
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-foreground">Key Features</h4>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        {selectedProject.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6 bg-muted/30 p-6 rounded-2xl border border-border h-fit">
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-foreground uppercase tracking-wider">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech_stack.map((tag: string, tIdx: number) => (
                          <span key={tIdx} className="text-xs font-medium px-2.5 py-1 bg-background border border-border text-foreground rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground uppercase tracking-wider">Architecture</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.architecture}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground uppercase tracking-wider">Challenges & Learnings</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-2"><strong className="text-foreground">Challenges:</strong> {selectedProject.challenges}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed"><strong className="text-foreground">Learnings:</strong> {selectedProject.learnings}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
