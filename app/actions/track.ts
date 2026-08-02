'use server';

import db from '@/lib/db';
import { headers } from 'next/headers';
import crypto from 'crypto';

export async function trackVisit(pagePath: string) {
  try {
    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';
    const userAgent = (await headers()).get('user-agent') ?? 'unknown';
    
    // Create a daily rolling hash of IP + UserAgent to respect privacy while preventing spam
    const salt = new Date().toISOString().split('T')[0]; 
    const sessionHash = crypto.createHash('sha256').update(`${ip}-${userAgent}-${salt}`).digest('hex');

    // Check if this session already tracked this page today
    const existingVisit = await db.visitor.findFirst({
      where: {
        session_hash: sessionHash,
        page_path: pagePath,
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)) // start of today
        }
      }
    });

    if (!existingVisit) {
      await db.visitor.create({
        data: {
          session_hash: sessionHash,
          page_path: pagePath,
          referrer: (await headers()).get('referer') || null
        }
      });
    }
  } catch (error) {
    // Fail silently, don't break the app if analytics fail
    console.error('Analytics tracking failed:', error);
  }
}
