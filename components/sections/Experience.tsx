'use client';

import { useRef, useEffect } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { Experience as ExperienceType } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export function Experience({ experiences }: { experiences: ExperienceType[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.experience-card');
      
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
      
      // Animate timeline line itself
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="experience" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl" ref={containerRef}>
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the impact I've made along the way.
          </p>
        </div>

        <div className="space-y-12 relative">
          {/* Desktop Timeline Line */}
          <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-border -translate-x-1/2">
            <div className="timeline-line absolute top-0 left-0 w-full h-full bg-primary origin-top"></div>
          </div>
          
          {experiences.map((exp, idx) => (
            <div key={idx} className="experience-card relative pl-8 md:pl-0">
              <div className={`md:flex items-center justify-between w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-[5px] md:-translate-x-1/2 mt-1.5 md:mt-0 z-10"></div>
                
                {/* Content Card */}
                <div className="md:w-[45%] bg-background p-6 rounded-2xl border border-border shadow-sm">
                  <h3 className="text-xl font-bold text-foreground">{exp.position}</h3>
                  <div className="text-primary font-medium mb-4">{exp.company}</div>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> 
                      {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} 
                      {' - '} 
                      {exp.current ? 'Present' : (exp.end_date ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '')}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {exp.location}
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-6 text-muted-foreground text-sm whitespace-pre-line">
                    {exp.description}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.tech_stack && exp.tech_stack.map((tag: string, tIdx: number) => (
                      <span key={tIdx} className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Spacer for alternate layout */}
                <div className="hidden md:block md:w-[45%]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
