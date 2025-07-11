import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  
  // Permitir acesso a /login e APIs do NextAuth
  if (pathname === '/login' || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }
  
  // Se não estiver logado, redirecionar para /login
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}; 