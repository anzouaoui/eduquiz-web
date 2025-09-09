import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const adminRoutes = ['/admin'];
const publicRoutes = ['/auth/signin', '/auth/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is an admin route
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  
  // Skip middleware for public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request });
  
  // If it's an admin route, check for admin role
  if (isAdminRoute) {
    if (!token) {
      // Redirect to login if not authenticated
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }
    
    // Check if user has admin role (you'll need to adjust this based on your user model)
    if (token.role !== 'admin') {
      // Redirect to home or unauthorized page
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
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
