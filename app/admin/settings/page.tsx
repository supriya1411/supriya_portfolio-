import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const { user } = await validateRequest();
  if (!user) redirect('/login');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="bg-background p-8 rounded-2xl border border-border shadow-sm max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Account Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Admin Email</label>
            <input 
              type="text" 
              value={user.email} 
              disabled 
              className="w-full px-4 py-3 bg-muted border border-border rounded-xl opacity-70"
            />
            <p className="text-xs text-muted-foreground mt-2">To change your email, please run the database migration script.</p>
          </div>
          
          <div className="pt-6 border-t border-border">
            <h3 className="font-medium text-red-500 mb-2">Danger Zone</h3>
            <button className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 font-medium transition-colors text-sm">
              Reset Analytics Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
