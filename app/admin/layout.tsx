'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== 'loading') {
      if (pathname !== '/admin/login') {
        if (!session?.user) {
          router.push('/admin/login');
        } else if (session.user.role !== 'ADMIN') {
          // User is authenticated but not an admin
          router.push('/');
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  }, [session, status, pathname, router]);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await signOut({ callbackUrl: '/admin/login' });
    }
  };

  // Don't show admin layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Only render admin layout if authenticated and is admin
  if (!session?.user || session.user.role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-primary-600 via-primary-700 to-accent-700 shadow-lg border-b border-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Paradise Resort - Admin Portal
              </h1>
              <p className="text-primary-100 text-xs mt-0.5">Management Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-white font-medium">Welcome, {session.user.name}</p>
                <p className="text-xs text-primary-200">Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium border border-white/20"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2 sticky top-8">
              <Link
                href="/admin"
                className={`block px-4 py-3 rounded-lg transition-colors font-medium ${
                  pathname === '/admin'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/rooms"
                className={`block px-4 py-3 rounded-lg transition-colors font-medium ${
                  pathname === '/admin/rooms'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Rooms
              </Link>
              <Link
                href="/admin/bookings"
                className={`block px-4 py-3 rounded-lg transition-colors font-medium ${
                  pathname === '/admin/bookings'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Bookings
              </Link>
              <div className="pt-4 mt-4 border-t border-gray-200">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                >
                  View Customer Site
                </a>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
