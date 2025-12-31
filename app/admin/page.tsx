'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalRooms: number;
  recentBookings: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [bookingsRes, roomsRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/rooms'),
      ]);

      const bookings = await bookingsRes.json();
      const rooms = await roomsRes.json();

      const stats: DashboardStats = {
        totalBookings: bookings.length,
        pendingBookings: bookings.filter((b: any) => b.status === 'PENDING').length,
        confirmedBookings: bookings.filter((b: any) => b.status === 'CONFIRMED').length,
        cancelledBookings: bookings.filter((b: any) => b.status === 'CANCELLED').length,
        totalRooms: rooms.length,
        recentBookings: bookings.slice(0, 5),
      };

      setStats(stats);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-red-500">
        Failed to load dashboard statistics
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Dashboard Overview</h2>
        <p className="text-gray-600 mt-2">Monitor your resort's performance and bookings</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-white group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <p className="text-primary-100 text-sm font-medium mb-2">Total Bookings</p>
          <p className="text-4xl font-bold">{stats.totalBookings}</p>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-white group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <p className="text-amber-100 text-sm font-medium mb-2">Pending</p>
          <p className="text-4xl font-bold">{stats.pendingBookings}</p>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-orange-700 to-orange-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-white group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <p className="text-emerald-100 text-sm font-medium mb-2">Confirmed</p>
          <p className="text-4xl font-bold">{stats.confirmedBookings}</p>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-white group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
          <p className="text-accent-100 text-sm font-medium mb-2">Total Rooms</p>
          <p className="text-4xl font-bold">{stats.totalRooms}</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Recent Bookings</h3>
              <p className="text-sm text-gray-600 mt-1">Latest reservation activity</p>
            </div>
            <Link
              href="/admin/bookings"
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
            >
              View All →
            </Link>
          </div>
        </div>
        <div className="p-6">

        {stats.recentBookings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No bookings yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Guest
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Check-in
                  </th>
                  <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {booking.user?.name || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {booking.room?.name || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'CONFIRMED'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/rooms"
          className="group relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 hover:from-primary-700 hover:via-primary-800 hover:to-primary-900 text-white rounded-xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
          <h3 className="text-2xl font-bold mb-3 relative z-10">Manage Rooms</h3>
          <p className="text-primary-100 relative z-10 text-sm">Add, edit, or remove room listings and inventory</p>
          <div className="mt-4 text-primary-200 group-hover:text-white transition-colors relative z-10 text-sm font-medium">Get started →</div>
        </Link>

        <Link
          href="/admin/bookings"
          className="group relative overflow-hidden bg-gradient-to-br from-accent-600 via-accent-700 to-accent-800 hover:from-accent-700 hover:via-accent-800 hover:to-accent-900 text-white rounded-xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500"></div>
          <h3 className="text-2xl font-bold mb-3 relative z-10">Manage Bookings</h3>
          <p className="text-accent-100 relative z-10 text-sm">View and update booking status and reservations</p>
          <div className="mt-4 text-accent-200 group-hover:text-white transition-colors relative z-10 text-sm font-medium">Get started →</div>
        </Link>
      </div>
    </div>
  );
}
