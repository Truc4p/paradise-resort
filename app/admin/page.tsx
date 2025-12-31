'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FiBell,
  FiAlertTriangle,
  FiInfo,
  FiCheckCircle,
  FiClock,
  FiLogIn,
  FiLogOut,
  FiMail,
  FiDollarSign,
  FiActivity,
} from 'react-icons/fi';

interface Alert {
  id: string;
  type: string;
  title: string;
  message: string;
  count: number;
  priority: string;
  link?: string;
}

interface NotificationData {
  alerts: Alert[];
  todayCheckIns: any[];
  todayCheckOuts: any[];
  recentBookings: any[];
  pendingBookings: any[];
  lowInventory: any[];
  unreadMessages: any[];
  pendingPayments: any[];
  systemHealth: {
    occupancyRate: number;
    totalRooms: number;
    availableRooms: number;
    totalBookings: number;
    totalUsers: number;
    totalRevenue: number;
    pendingBookingsCount: number;
    pendingPaymentsCount: number;
    unreadMessagesCount: number;
    lowInventoryCount: number;
  };
}

export default function AdminDashboard() {
  const [data, setData] = useState<NotificationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    // Refresh every 30 seconds for real-time updates
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/admin/notifications');
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <FiAlertTriangle className="text-xl" />;
      case 'success':
        return <FiCheckCircle className="text-xl" />;
      case 'info':
        return <FiInfo className="text-xl" />;
      default:
        return <FiBell className="text-xl" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'from-yellow-500 to-orange-600';
      case 'success':
        return 'from-green-500 to-emerald-600';
      case 'info':
        return 'from-blue-500 to-cyan-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-red-500">
        Failed to load dashboard data
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 mt-2">Real-time insights and notifications</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <FiActivity /> Refresh
        </button>
      </div>

      {/* Alerts Banner */}
      {data.alerts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.alerts.slice(0, 6).map((alert) => (
            <div
              key={alert.id}
              className={`bg-gradient-to-r ${getAlertColor(alert.type)} rounded-xl shadow-lg p-4 text-white cursor-pointer hover:shadow-xl transition-all`}
              onClick={() => alert.link && (window.location.href = alert.link)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <h4 className="font-bold text-sm">{alert.title}</h4>
                    <p className="text-sm opacity-90 mt-1">{alert.message}</p>
                  </div>
                </div>
                {alert.count > 0 && (
                  <span className="bg-white bg-opacity-30 px-2 py-1 rounded-full text-xs font-bold">
                    {alert.count}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* System Health Status */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <FiActivity className="text-2xl text-primary-600" />
          <h3 className="text-2xl font-bold text-gray-900">System Health</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium mb-1">Occupancy Rate</p>
            <p className="text-3xl font-bold text-blue-900">{data.systemHealth.occupancyRate}%</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
            <p className="text-sm text-green-600 font-medium mb-1">Available Rooms</p>
            <p className="text-3xl font-bold text-green-900">{data.systemHealth.availableRooms}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4">
            <p className="text-sm text-purple-600 font-medium mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-purple-900">{data.systemHealth.totalBookings}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4">
            <p className="text-sm text-orange-600 font-medium mb-1">Total Users</p>
            <p className="text-3xl font-bold text-orange-900">{data.systemHealth.totalUsers}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4">
            <p className="text-sm text-pink-600 font-medium mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-pink-900">${data.systemHealth.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Today's Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Check-ins */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
            <div className="flex items-center gap-2">
              <FiLogIn className="text-xl text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Today's Check-ins</h3>
              <span className="ml-auto bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {data.todayCheckIns.length}
              </span>
            </div>
          </div>
          <div className="p-6 max-h-80 overflow-y-auto">
            {data.todayCheckIns.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No check-ins today</p>
            ) : (
              <div className="space-y-3">
                {data.todayCheckIns.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-3 hover:border-green-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{booking.user.name}</p>
                        <p className="text-sm text-gray-600">{booking.room.name}</p>
                        <p className="text-xs text-gray-500">{booking.user.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          {new Date(booking.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-xs text-gray-500">{booking.numberOfGuests} guests</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Today's Check-outs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-orange-100">
            <div className="flex items-center gap-2">
              <FiLogOut className="text-xl text-orange-600" />
              <h3 className="text-xl font-bold text-gray-900">Today's Check-outs</h3>
              <span className="ml-auto bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {data.todayCheckOuts.length}
              </span>
            </div>
          </div>
          <div className="p-6 max-h-80 overflow-y-auto">
            {data.todayCheckOuts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No check-outs today</p>
            ) : (
              <div className="space-y-3">
                {data.todayCheckOuts.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-3 hover:border-orange-300 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{booking.user.name}</p>
                        <p className="text-sm text-gray-600">{booking.room.name}</p>
                        <p className="text-xs text-gray-500">{booking.user.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-orange-600">
                          {new Date(booking.checkOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-xs text-gray-500">{booking.numberOfGuests} guests</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Low Inventory Warning */}
      {data.lowInventory.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-yellow-500">
          <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100">
            <div className="flex items-center gap-2">
              <FiAlertTriangle className="text-xl text-yellow-600" />
              <h3 className="text-xl font-bold text-gray-900">Low Room Availability</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.lowInventory.map((room: any) => (
                <div key={room.roomId} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">{room.roomName}</h4>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-700">
                      Available: <span className="font-bold text-yellow-700">{room.availableRooms}</span> / {room.totalRooms}
                    </p>
                    <p className="text-gray-700">
                      Booked: <span className="font-bold">{room.bookedRooms}</span>
                    </p>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${100 - room.availabilityPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Unread Messages */}
      {data.unreadMessages.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
            <div className="flex items-center gap-2">
              <FiMail className="text-xl text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">Unread Customer Messages</h3>
              <span className="ml-auto bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {data.unreadMessages.length}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {data.unreadMessages.slice(0, 5).map((message: any) => (
                <div key={message.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{message.name}</p>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-medium text-gray-800 text-sm mb-1">{message.subject}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/bookings"
          className="group bg-gradient-to-br from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl shadow-lg hover:shadow-xl p-6 transition-all transform hover:-translate-y-1"
        >
          <FiClock className="text-3xl mb-3" />
          <h3 className="text-lg font-bold mb-2">Manage Bookings</h3>
          <p className="text-sm text-primary-100">View and update reservations</p>
        </Link>

        <Link
          href="/admin/rooms"
          className="group bg-gradient-to-br from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white rounded-xl shadow-lg hover:shadow-xl p-6 transition-all transform hover:-translate-y-1"
        >
          <FiActivity className="text-3xl mb-3" />
          <h3 className="text-lg font-bold mb-2">Manage Rooms</h3>
          <p className="text-sm text-orange-100">Update room inventory</p>
        </Link>

        <Link
          href="/admin/finance"
          className="group bg-gradient-to-br from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl shadow-lg hover:shadow-xl p-6 transition-all transform hover:-translate-y-1"
        >
          <FiDollarSign className="text-3xl mb-3" />
          <h3 className="text-lg font-bold mb-2">Finance</h3>
          <p className="text-sm text-green-100">Track payments & revenue</p>
        </Link>

        <Link
          href="/admin/analytics"
          className="group bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl shadow-lg hover:shadow-xl p-6 transition-all transform hover:-translate-y-1"
        >
          <FiActivity className="text-3xl mb-3" />
          <h3 className="text-lg font-bold mb-2">Analytics</h3>
          <p className="text-sm text-purple-100">View detailed reports</p>
        </Link>
      </div>
    </div>
  );
}
