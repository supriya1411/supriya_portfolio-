'use client';

import React, { useState, forwardRef } from 'react';
import { Award, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; number?: number; className?: string }>(
  ({ children, number, className }, ref) => {
    return (
      <div className={`w-full h-full bg-background relative overflow-hidden flex flex-col ${className}`} ref={ref}>
        {children}
        {number && (
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground font-mono">
            - {number} -
          </div>
        )}
      </div>
    );
  }
);
Page.displayName = 'Page';

export default function CertificateBook({ certificates = [] }: { certificates: any[] }) {
  // Pad certificates to 20 pages
  const items = [...certificates];
  if (items.length < 20) {
    const missing = 20 - items.length;
    for (let i = 0; i < missing; i++) {
      items.push({ 
        title: `Certificate of Completion ${i + 1}`, 
        issuer: 'Tech Academy', 
        issue_date: new Date().toISOString() 
      });
    }
  }

  const pages = [
    // Cover Page
    <Page key="cover" className="rounded-r-2xl rounded-l-sm border-l-[12px] border-l-black/80 shadow-[inset_-8px_0_15px_rgba(0,0,0,0.5),inset_8px_0_15px_rgba(255,255,255,0.05),4px_4px_15px_rgba(0,0,0,0.4)]">
      <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
        <div className="absolute inset-4 border-2 border-primary/50 rounded-lg pointer-events-none shadow-[0_0_10px_rgba(var(--primary),0.2)]"></div>
        <div className="absolute inset-5 border border-primary/20 rounded-md pointer-events-none"></div>
        <div className="relative mb-8 mt-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary blur-xl opacity-20 rounded-full"></div>
          <div className="relative z-10 w-24 h-24 flex items-center justify-center bg-background rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.1)] border-2 border-primary/60">
            <div className="absolute inset-1.5 border-[2px] border-dashed border-primary/40 rounded-full"></div>
            <div className="absolute inset-2.5 border border-primary/30 rounded-full"></div>
            <Award className="w-10 h-10 text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
            <div className="absolute -bottom-6 flex gap-2 -z-10">
              <div className="w-6 h-10 bg-primary/80 shadow-lg translate-y-1 -rotate-[15deg] origin-top rounded-sm flex items-end border border-black/20">
                  <div className="w-full border-b-[8px] border-b-transparent border-l-[12px] border-l-background/50 border-r-[12px] border-r-background/50"></div>
              </div>
              <div className="w-6 h-10 bg-primary/80 shadow-lg translate-y-1 rotate-[15deg] origin-top rounded-sm flex items-end border border-black/20">
                  <div className="w-full border-b-[8px] border-b-transparent border-l-[12px] border-l-background/50 border-r-[12px] border-r-background/50"></div>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold tracking-[0.2em] text-center px-4 text-foreground drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] uppercase">
          Certificates
        </h2>
        <div className="mt-6 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />
        <div className="mt-8 text-[10px] text-primary/80 uppercase tracking-[0.3em] font-medium">
          Professional Portfolio
        </div>
      </div>
    </Page>,
    
    // Certificate Pages
    ...items.map((cert, i) => (
      <Page key={i} number={i + 1} className="border-y border-r border-border shadow-[inset_4px_0_10px_rgba(0,0,0,0.1)]">
        <div className="w-full h-full border-[8px] border-double border-border flex flex-col items-center justify-center p-4 text-center bg-card relative overflow-hidden">
          {cert.image_url ? (
            <div className="w-full h-full relative flex items-center justify-center group">
              <a href={cert.image_url} target="_blank" rel="noreferrer" className="w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <img src={cert.image_url} alt={cert.title} className="max-w-full max-h-full object-contain rounded-md shadow-md transition-transform duration-300 group-hover:scale-[1.02]" title="Click to view full size" />
              </a>
            </div>
          ) : (
            <>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none text-primary">
                <Award className="w-48 h-48" />
              </div>
              <div className="z-10 w-full h-full flex flex-col justify-center items-center text-foreground">
                <h4 className="uppercase tracking-widest text-[10px] text-primary mb-6 font-bold">Certificate of Achievement</h4>
                <h3 className="text-xl font-bold text-foreground mb-6 leading-tight">{cert.title}</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-medium">Proudly Presented By</p>
                <p className="text-sm text-foreground font-semibold mb-8 italic">{cert.issuer}</p>
                <div className="w-12 h-px bg-border mx-auto mb-6" />
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground bg-muted/50 py-1.5 px-3 rounded-full w-max mx-auto border border-border shadow-sm">
                  <Calendar className="w-3 h-3" />
                  {new Date(cert.issue_date).getFullYear()}
                </div>
              </div>
            </>
          )}
        </div>
      </Page>
    )),

    // Back Cover
    <Page key="back" className="rounded-l-xl rounded-r-sm border-r-8 border-r-black shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
      <div className="h-full w-full flex flex-col items-center justify-center relative">
        <div className="absolute inset-3 border-2 border-primary/20 rounded-lg pointer-events-none"></div>
        <div className="text-primary/40 text-sm font-medium uppercase tracking-widest">
            End of Folio
        </div>
      </div>
    </Page>
  ];

  const sheets = [];
  for (let i = 0; i < pages.length; i += 2) {
    sheets.push({
      front: pages[i],
      back: pages[i + 1] || <Page key={`empty-${i}`} className="bg-background shadow-inner"><div /></Page>
    });
  }

  const [currentSheet, setCurrentSheet] = useState(0);

  const turnNext = () => {
    if (currentSheet < sheets.length - 1) {
      setCurrentSheet((prev) => prev + 1);
    }
  };

  const turnPrev = () => {
    if (currentSheet > 0) {
      setCurrentSheet((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-8 w-full select-none">
      <div 
        className="relative w-full max-w-[900px] aspect-[450/320]"
        style={{ perspective: '2500px' }}
      >
        <div className="absolute inset-0 flex justify-center items-center">
          
          {/* Left spacer to maintain center alignment for the right-anchored sheets */}
          <div className="relative w-1/2 h-full"></div>

          {/* Book Sheets - Anchored on the right half, folding left */}
          <div className="relative w-1/2 h-full" style={{ transformStyle: 'preserve-3d' }}>
            {sheets.map((sheet, index) => {
              const isFlipped = index < currentSheet;
              const zIndex = isFlipped ? index : sheets.length - index;

              return (
                <div
                  key={index}
                  className="absolute inset-0 left-0 origin-left cursor-pointer transition-transform duration-[800ms] ease-[cubic-bezier(0.645,0.045,0.355,1.000)] shadow-2xl rounded-r-md"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                    zIndex: zIndex
                  }}
                  onClick={() => {
                    if (isFlipped) {
                      setCurrentSheet(index);
                    } else {
                      setCurrentSheet(index + 1);
                    }
                  }}
                >
                  {/* Front Face (Right Page) */}
                  <div 
                    className="absolute inset-0 backface-hidden"
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  >
                    {sheet.front}
                    {/* Spine shadow */}
                    <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-50"></div>
                    {/* Curl shadow on hover */}
                    {!isFlipped && (
                      <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none z-40"></div>
                    )}
                  </div>

                  {/* Back Face (Left Page) */}
                  <div 
                    className="absolute inset-0 backface-hidden"
                    style={{ 
                      backfaceVisibility: 'hidden', 
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)' 
                    }}
                  >
                    {sheet.back}
                    {/* Spine shadow for back face */}
                    <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-50"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-12">
        <button 
          onClick={turnPrev} 
          disabled={currentSheet === 0}
          className="flex items-center justify-center p-3 rounded-full bg-muted text-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:hover:bg-muted disabled:hover:text-foreground transition-colors shadow-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={turnNext} 
          disabled={currentSheet >= sheets.length - 1}
          className="flex items-center justify-center p-3 rounded-full bg-muted text-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:hover:bg-muted disabled:hover:text-foreground transition-colors shadow-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
