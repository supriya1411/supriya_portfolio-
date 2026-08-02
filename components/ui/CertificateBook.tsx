'use client';

import React, { forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Award, Medal, Calendar } from 'lucide-react';

interface PageProps {
  children: React.ReactNode;
  number?: number;
}

const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div className="demoPage bg-background shadow-xl border-y border-r border-border" ref={ref}>
      <div className="page-content w-full h-full p-4 flex flex-col items-center justify-center relative overflow-hidden bg-background">
        {props.children}
        {props.number && (
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground font-mono">
            - {props.number} -
          </div>
        )}
      </div>
    </div>
  );
});

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

  return (
    <div className="flex justify-center items-center py-4 w-full">
      {/* @ts-ignore - react-pageflip types might clash with React 18 */}
      <HTMLFlipBook 
        width={320} 
        height={420} 
        size="stretch"
        minWidth={280}
        maxWidth={400}
        minHeight={380}
        maxHeight={500}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="certificate-flipbook mx-auto"
        style={{ margin: '0 auto' }}
      >
        {/* Cover - Professional Dark & Pink Theme Cover */}
        <Page>
          <div className="h-full w-full bg-background flex flex-col items-center justify-center rounded-r-2xl rounded-l-sm border-l-[12px] border-l-black/80 shadow-[inset_-8px_0_15px_rgba(0,0,0,0.5),inset_8px_0_15px_rgba(255,255,255,0.05),4px_4px_15px_rgba(0,0,0,0.4)] relative overflow-hidden">
            
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
            
            {/* Double primary color border */}
            <div className="absolute inset-4 border-2 border-primary/50 rounded-lg pointer-events-none shadow-[0_0_10px_rgba(var(--primary),0.2)]"></div>
            <div className="absolute inset-5 border border-primary/20 rounded-md pointer-events-none"></div>
            
            {/* Professional Seal / Logo in Pink/Coral */}
            <div className="relative mb-8 mt-4 flex items-center justify-center">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-primary blur-xl opacity-20 rounded-full"></div>
              
              {/* Detailed Seal Structure */}
              <div className="relative z-10 w-24 h-24 flex items-center justify-center bg-background rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.1)] border-2 border-primary/60">
                {/* Inner Ring */}
                <div className="absolute inset-1.5 border-[2px] border-dashed border-primary/40 rounded-full"></div>
                <div className="absolute inset-2.5 border border-primary/30 rounded-full"></div>
                
                {/* Center Icon */}
                <Award className="w-10 h-10 text-primary drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                
                {/* Ribbon Tails */}
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
        </Page>

        {/* Certificate Pages - 20 total */}
        {items.map((cert, i) => (
          <Page key={i} number={i + 1}>
             <div className="w-full h-full border-[8px] border-double border-border flex flex-col items-center justify-center p-4 text-center bg-card relative overflow-hidden">
                {cert.image_url ? (
                  <div className="w-full h-full relative flex items-center justify-center">
                    <img src={cert.image_url} alt={cert.title} className="max-w-full max-h-full object-contain rounded-md shadow-md" />
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
        ))}

        {/* Back Cover */}
        <Page>
           <div className="h-full w-full bg-background flex flex-col items-center justify-center rounded-l-xl rounded-r-sm border-r-8 border-r-black shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] relative">
              <div className="absolute inset-3 border-2 border-primary/20 rounded-lg pointer-events-none"></div>
              <div className="text-primary/40 text-sm font-medium uppercase tracking-widest">
                 End of Folio
              </div>
           </div>
        </Page>
      </HTMLFlipBook>
    </div>
  );
}
