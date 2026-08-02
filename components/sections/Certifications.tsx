'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import dynamic from 'next/dynamic';
import { Certificate as CertificateType } from '@/data/portfolio';

const CertificateBook = dynamic(() => import('@/components/ui/CertificateBook'), { 
  ssr: false,
  loading: () => <div className="h-[420px] w-[320px] bg-muted/20 animate-pulse rounded-lg flex items-center justify-center">Loading certificates...</div>
});

export function Certifications({ certificates }: { certificates: CertificateType[] }) {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion 
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certifications" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={variants}
          className="flex flex-col h-full items-center text-center max-w-3xl mx-auto"
        >
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Certification Hub</h2>
            <p className="text-muted-foreground">Professional credentials and continued learning.</p>
          </div>
          
          <div className="w-full flex items-center justify-center bg-background rounded-3xl border border-border p-4 md:p-8 relative overflow-hidden shadow-sm">
             <CertificateBook certificates={certificates} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
