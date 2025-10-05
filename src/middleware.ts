import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes user can access without being logged in
const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password']

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Skip middleware for API routes
  if (path.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check for the frontend token cookie
  const token = request.cookies.get('frontendToken')?.value;
  const isPublic = publicRoutes.includes(path);
  
  // For non-public routes, ensure token exists
  if (!token && !isPublic) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', path); // Optional: save intended destination
    return NextResponse.redirect(url);
  }
  
  // Prevent authenticated users from accessing auth pages
  if (token && isPublic && path !== '/') {
    return NextResponse.redirect(new URL('/shop', request.url));
  }
  
  return NextResponse.next();
}

export const config = { 
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}