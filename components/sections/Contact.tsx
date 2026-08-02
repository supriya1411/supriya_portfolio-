'use client';

import { useActionState, useEffect, useRef } from 'react';
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitContactForm } from '@/app/actions/contact';
import { Profile } from '@/data/portfolio';

const initialState = {
  success: false,
  error: null as string | null,
};

export function Contact({ profile }: { profile: Profile }) {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Let's build something together.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            
            <div className="flex items-center gap-4 text-muted-foreground">
              <Mail className="w-5 h-5" />
              <a href={`mailto:${profile.links.email}`} className="hover:text-foreground transition-colors font-medium">
                {profile.links.email}
              </a>
            </div>
          </div>

          <div className="bg-background rounded-3xl border border-border p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" /> Send a Message
            </h3>
            
            <form action={formAction} ref={formRef} className="space-y-4">
              {state.success && (
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-900/20 dark:text-green-400 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {state.error && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> {state.error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    required
                    disabled={isPending}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    required
                    disabled={isPending}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all disabled:opacity-50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  disabled={isPending}
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none disabled:opacity-50"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors mt-2 disabled:opacity-70"
              >
                {isPending ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
