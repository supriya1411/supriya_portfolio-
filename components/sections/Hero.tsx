'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Profile } from '@/data/portfolio';
import { Code2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const HeroScene = dynamic(() => import('@/components/ui/HeroScene'), { ssr: false });

export function Hero({ profile }: { profile: Profile }) {
  const prefersReducedMotion = useReducedMotion();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    if (profile.roles.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % profile.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [profile.roles.length]);

  const animationProps = prefersReducedMotion 
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

  return (
    <section id="hero" className="min-h-[90vh] flex items-center justify-center pt-20 relative overflow-hidden">
      <HeroScene />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <motion.div 
          {...animationProps}
          className="inline-flex items-center rounded-full border border-border px-3 py-1 text-sm text-muted-foreground mb-8 bg-background/50 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          {profile.tagline}
        </motion.div>
        
        <motion.h1 
          {...animationProps}
          transition={{ ...animationProps.transition, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 text-foreground"
        >
          Hi, I'm <span className="text-primary/70">{profile.name.split(' ')[0] || 'Supriya'}</span>.
        </motion.h1>
        
        <motion.div
          {...animationProps}
          transition={{ ...animationProps.transition, delay: 0.15 }}
          className="h-10 md:h-12 flex items-center justify-center overflow-hidden mb-6"
        >
          <p className="text-2xl md:text-4xl font-semibold text-muted-foreground/80">
            <span className="sr-only">I am a {profile.roles[currentRoleIndex]}</span>
            <span aria-hidden="true">
              I am a{' '}
              <motion.span
                key={currentRoleIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                className="text-foreground inline-block"
              >
                {profile.roles[currentRoleIndex]}
              </motion.span>
            </span>
          </p>
        </motion.div>
        
        <motion.p 
          {...animationProps}
          transition={{ ...animationProps.transition, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-[42rem] mx-auto mb-10 text-balance leading-relaxed"
        >
          {profile.summary}
        </motion.p>
        
        <motion.div 
          {...animationProps}
          transition={{ ...animationProps.transition, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center mb-8"
        >
          <a 
            href={profile.links.resume}
            target="_blank"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 w-full sm:w-auto"
          >
            Download Resume
          </a>
          <a 
            href="#projects" 
            className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-background/50 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-colors hover:bg-muted w-full sm:w-auto"
          >
            View Projects
          </a>
        </motion.div>

        <motion.div
          {...animationProps}
          transition={{ ...animationProps.transition, delay: 0.4 }}
          className="flex items-center gap-6 text-muted-foreground"
        >
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a href={profile.links.leetcode} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors" aria-label="LeetCode">
            <Code2 className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
