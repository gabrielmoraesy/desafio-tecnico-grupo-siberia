import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Se for uma rota de autenticação da API, permite o acesso
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Se o usuário já está logado e tenta acessar a página de login
  if (pathname === '/login' && session) {
    const dashboardUrl = new URL('/dashboard', req.url);
    dashboardUrl.searchParams.set('message', 'already-logged-in');
    return NextResponse.redirect(dashboardUrl);
  }

  // Se for a página de login e não está logado, permite o acesso
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Para todas as outras rotas, verifica se está logado
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}; 