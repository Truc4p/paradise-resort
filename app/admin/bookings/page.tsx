'use client';

import { useEffect, useState } from 'react';

interface Booking {
  id: string;
  status: string;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  specialRequests: string | null;
  totalPrice: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  room: {
    id: string;
    name: string;
    basePrice: number;
  };
  payment: {
    id: string;
    amount: number;
    status: string;
  } | null;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    if (!confirm(`Are you sure you want to change status to ${newStatus}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        alert('Booking status updated successfully!');
        fetchBookings();
        setSelectedBooking(null);
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || 'Failed to update booking'}`);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Failed to update booking status');
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'ALL') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Booking Management</h2>
          <p className="text-gray-600 mt-2">View and manage all reservations</p>
        </div>
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg shadow-lg">
          <div className="text-sm font-medium opacity-90">Total Bookings</div>
          <div className="text-2xl font-bold">{filteredBookings.length}</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex gap-3 flex-wrap">
          {['ALL', 'PENDING', 'CONFIRMED', 'CANCELLED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                filter === status
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg transform -translate-y-0.5'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }`}
            >
              {status}
              {status !== 'ALL' && (
                <span className="ml-2 text-xs">
                  ({bookings.filter((b) => b.status === status).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-white">
              <tr>
                <th className="text-left py-4 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Guest
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Room
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Check-in
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Check-out
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Guests
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Total
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-gray-500">
                    No bookings found for this filter.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {booking.id.slice(0, 8)}...
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.user?.name || 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.user?.email || 'N/A'}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {booking.room?.name || 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {booking.numberOfGuests}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      ${Number(booking.totalPrice).toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold text-gray-900">
                  Booking Details
                </h3>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Guest Information */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Guest Information</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Name: </span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedBooking.user?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email: </span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedBooking.user?.email}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Number of Guests: </span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedBooking.numberOfGuests}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Information */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Booking Information</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Room: </span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedBooking.room?.name}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Check-in: </span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(selectedBooking.checkIn).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Check-out: </span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(selectedBooking.checkOut).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Total Price: </span>
                    <span className="text-sm font-medium text-gray-900">
                      ${selectedBooking.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Booked on: </span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(selectedBooking.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {selectedBooking.specialRequests && (
                    <div>
                      <span className="text-sm text-gray-600">Special Requests: </span>
                      <p className="text-sm text-gray-900 mt-1">
                        {selectedBooking.specialRequests}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Management */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Update Status</h4>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'CONFIRMED')}
                    disabled={selectedBooking.status === 'CONFIRMED'}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'PENDING')}
                    disabled={selectedBooking.status === 'PENDING'}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Set Pending
                  </button>
                  <button
                    onClick={() => updateBookingStatus(selectedBooking.id, 'CANCELLED')}
                    disabled={selectedBooking.status === 'CANCELLED'}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
