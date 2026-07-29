import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
  // Solo interceptar rutas que empiezan con /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('sr_admin_session');

    // Si no tiene la cookie de admin, redirigir al login
    if (!adminSession || adminSession.value !== 'true') {
      const loginUrl = new URL('/login', request.url);
      // Opcional: guardar la url original para volver luego de loguearse
      // loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
