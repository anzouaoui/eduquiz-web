import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { createServerClient } from '@supabase/ssr';

const adminRoutes = ['/admin'];
const publicRoutes = ['/auth/signin', '/auth/register', '/auth/login'];
const protectedRoutes = ['/profile', '/rooms/create'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const res = NextResponse.next();
  
  // Redirect /privacy to /confidentialite with 301 (permanent) status
  if (pathname === '/privacy') {
    return NextResponse.redirect(
      new URL('/confidentialite', request.url),
      { status: 301 }
    );
  }

  // Skip middleware for public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return res;
  }

  // Initialize Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value; },
        set() {},
        remove() {},
      },
    }
  );

  // Get session from Supabase
  const { data: { session } } = await supabase.auth.getSession();

  // Check protected routes
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  if (isProtectedRoute && !session) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // Check if the route is an admin route
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  
  // If it's an admin route, check for admin role using NextAuth
  if (isAdminRoute) {
    const token = await getToken({ req: request });
    
    // If there's no token, redirect to login
    if (!token) {
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }

    // Check if user has admin role
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
