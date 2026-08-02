import { validateRequest } from '@/lib/auth';
import db from '@/lib/db';

export default async function AdminDashboardPage() {
  const { user } = await validateRequest();
  
  // Fetch some quick stats
  const [messagesCount, visitorsCount, projectsCount] = await Promise.all([
    db.message.count({ where: { is_read: false } }),
    db.visitor.count(),
    db.project.count(),
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.email}</h1>
        <p className="text-muted-foreground">Here's what's happening with your portfolio today.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Unread Messages</h3>
          <div className="text-4xl font-bold">{messagesCount}</div>
        </div>
        <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Visitors</h3>
          <div className="text-4xl font-bold">{visitorsCount}</div>
        </div>
        <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Projects</h3>
          <div className="text-4xl font-bold">{projectsCount}</div>
        </div>
      </div>

      <div className="bg-background p-8 rounded-2xl border border-border shadow-sm">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="text-muted-foreground">
          The dashboard structure is ready. You can now start building out the management interfaces for your Projects, Experiences, and Messages!
        </div>
      </div>
    </div>
  );
}
