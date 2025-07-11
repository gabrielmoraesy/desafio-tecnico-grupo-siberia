import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  if (!process.env.NEXTAUTH_SECRET) {
    return NextResponse.next();
  }

  try {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/api/auth')) {
      return NextResponse.next();
    }

    if (pathname === '/login' && session) {
      const dashboardUrl = new URL('/dashboard', req.url);
      dashboardUrl.searchParams.set('message', 'already-logged-in');
      return NextResponse.redirect(dashboardUrl);
    }

    if (pathname === '/login') {
      return NextResponse.next();
    }

    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}; 