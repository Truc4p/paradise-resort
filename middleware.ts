import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname, method } = req.nextUrl;
        
        // Allow POST to /api/users (user registration)
        if (pathname === '/api/users' && req.method === 'POST') {
          return true;
        }
        
        // Allow POST to /api/bookings (guest bookings)
        if (pathname === '/api/bookings' && req.method === 'POST') {
          return true;
        }
        
        // Require authentication for other protected routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/bookings/:path*',
    '/api/users',
  ],
};
