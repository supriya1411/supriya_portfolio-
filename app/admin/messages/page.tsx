import db from '@/lib/db';
import { markMessageRead, deleteMessage } from '@/app/actions/admin';
import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Trash2, CheckCircle } from 'lucide-react';

export default async function MessagesPage() {
  const { user } = await validateRequest();
  if (!user) redirect('/login');

  const messages = await db.message.findMany({
    orderBy: { created_at: 'desc' }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground bg-background rounded-2xl border border-border">
            No messages yet.
          </div>
        ) : (
          messages.map((msg: any) => (
            <div key={msg.id} className={`p-6 rounded-2xl border ${msg.is_read ? 'bg-background border-border' : 'bg-primary/5 border-primary/20'} shadow-sm flex flex-col md:flex-row gap-4 justify-between items-start`}>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg">{msg.sender_name}</h3>
                  <a href={`mailto:${msg.sender_email}`} className="text-sm text-primary hover:underline">{msg.sender_email}</a>
                  <span className="text-xs text-muted-foreground">{new Date(msg.created_at).toLocaleString()}</span>
                </div>
                <p className="text-foreground whitespace-pre-wrap">{msg.message}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                {!msg.is_read && (
                  <form action={markMessageRead.bind(null, msg.id)}>
                    <button type="submit" className="p-2 text-green-500 hover:bg-green-500/10 rounded-lg transition-colors" title="Mark as read">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </form>
                )}
                <form action={deleteMessage.bind(null, msg.id)}>
                  <button type="submit" className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete message">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
