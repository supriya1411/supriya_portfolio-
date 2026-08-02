'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/actions/auth';
import { Lock } from 'lucide-react';

const initialState = {
  error: null as string | null,
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-muted/30 p-8 rounded-3xl border border-border shadow-sm">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full text-primary">
            <Lock className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-8">Admin Access</h1>
        
        <form action={formAction} className="space-y-4">
          {state.error && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-lg text-center">
              {state.error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input 
              type="email" 
              name="email"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="admin@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input 
              type="password" 
              name="password"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isPending}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors mt-6 disabled:opacity-70"
          >
            {isPending ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
