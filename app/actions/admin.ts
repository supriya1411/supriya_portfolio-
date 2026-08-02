'use server';

import db from '@/lib/db';
import { validateRequest } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function markMessageRead(id: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error('Unauthorized');

  await db.message.update({
    where: { id },
    data: { is_read: true }
  });

  revalidatePath('/admin/messages');
}

export async function deleteMessage(id: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error('Unauthorized');

  await db.message.delete({
    where: { id }
  });

  revalidatePath('/admin/messages');
}
