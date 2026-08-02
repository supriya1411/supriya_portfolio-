'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisit } from '@/app/actions/track';

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only run on the client side, and delay it slightly to not block hydration
    const timer = setTimeout(() => {
      trackVisit(pathname);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
