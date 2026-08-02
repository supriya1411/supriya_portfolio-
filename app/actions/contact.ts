'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import db from '@/lib/db';
import { headers } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

// Create a new ratelimiter, that allows 3 requests per 1 hour
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: true,
});

const contactSchema = z.object({
  name: z.string().min(2, 'Name is too short').max(100),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message is too short').max(2000),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    // 1. Rate Limiting
    const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';
    const { success } = await ratelimit.limit(`contact_${ip}`);
    
    if (!success) {
      return { success: false, error: 'Too many requests. Please try again later.' };
    }

    // 2. Validation
    const validatedData = contactSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    });

    if (!validatedData.success) {
      return { success: false, error: validatedData.error.issues[0].message };
    }

    const { name, email, message } = validatedData.data;

    // 3. Save to Database
    await db.message.create({
      data: {
        sender_name: name,
        sender_email: email,
        message: message,
      }
    });

    // 4. Send Email
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'test@example.com',
        subject: `New message from ${name}`,
        replyTo: email,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Contact form error:', error);
    return { success: false, error: 'Something went wrong. Please try again later.' };
  }
}
