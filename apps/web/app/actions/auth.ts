'use server';

import { cookies } from 'next/headers';

export async function setAdminSession(email: string) {
  if (email.includes('admin')) {
    const cookieStore = await cookies();
    cookieStore.set('sr_admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });
    return true;
  }
  return false;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete('sr_admin_session');
}
