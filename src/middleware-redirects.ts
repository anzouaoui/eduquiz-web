import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect /privacy to /confidentialite with 301 (permanent) status
  if (request.nextUrl.pathname === '/privacy') {
    return NextResponse.redirect(
      new URL('/confidentialite', request.url),
      { status: 301 }
    );
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/privacy',
};
