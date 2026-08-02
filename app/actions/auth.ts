'use server';

import db from '@/lib/db';
import { lucia } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import argon2 from 'argon2';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: 'Invalid input' };
  }

  const user = await db.user.findUnique({
    where: { email: email.toLowerCase() }
  });

  if (!user) {
    return { error: 'Incorrect email or password' };
  }

  const validPassword = await argon2.verify(user.password_hash, password);
  if (!validPassword) {
    return { error: 'Incorrect email or password' };
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  
  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  
  return redirect('/admin');
}

export async function logoutAction(formData?: FormData) {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return redirect('/login');

  await lucia.invalidateSession(sessionId);

  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect('/login');
}
