export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/bookings/:path*',
    '/api/users/:path*',
  ],
};
