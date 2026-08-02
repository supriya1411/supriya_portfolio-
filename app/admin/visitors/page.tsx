import db from '@/lib/db';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function VisitorsPage() {
  const { user } = await validateRequest();
  if (!user) redirect('/login');

  const visitors = await db.visitor.findMany({
    orderBy: { created_at: 'desc' },
    take: 100, // Show last 100
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analytics (Last 100 Visits)</h1>
      
      <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-muted/50 text-muted-foreground text-sm">
            <tr>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Page</th>
              <th className="p-4 font-medium">Referrer</th>
              <th className="p-4 font-medium">Session Hash (Anonymous)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {visitors.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">No visitors recorded yet.</td>
              </tr>
            ) : (
              visitors.map((v: any) => (
                <tr key={v.id} className="hover:bg-muted/20 transition-colors">
                  <td className="p-4">{new Date(v.created_at).toLocaleString()}</td>
                  <td className="p-4 font-medium text-primary">{v.page_path}</td>
                  <td className="p-4 text-muted-foreground">{v.referrer || 'Direct'}</td>
                  <td className="p-4 font-mono text-xs text-muted-foreground truncate max-w-[200px]" title={v.session_hash}>
                    {v.session_hash}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
