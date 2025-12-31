'use client';

import { useEffect, useState } from 'react';
import { FiSearch, FiMail, FiPhone, FiCalendar, FiDollarSign, FiUser, FiShield } from 'react-icons/fi';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: 'GUEST' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
  bookings: {
    id: string;
    status: string;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
    numberOfGuests: number;
    createdAt: string;
    room: {
      id: string;
      name: string;
      imageUrl: string;
    };
    payment: {
      id: string;
      amount: number;
      status: string;
    } | null;
  }[];
  stats: {
    totalBookings: number;
    confirmedBookings: number;
    pendingBookings: number;
    cancelledBookings: number;
    totalSpent: number;
    totalReviews: number;
  };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [roleFilter, sortBy, sortOrder]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (roleFilter) params.append('role', roleFilter);
      params.append('sortBy', sortBy);
      params.append('sortOrder', sortOrder);

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      const result = await res.json();
      if (result.success) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  const updateUserRole = async (userId: string, newRole: 'GUEST' | 'ADMIN') => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      return;
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: newRole }),
      });

      const result = await res.json();
      if (result.success) {
        alert(result.message);
        fetchUsers();
        if (selectedUser?.id === userId) {
          setSelectedUser({ ...selectedUser, role: newRole });
        }
      } else {
        alert(result.error || 'Failed to update user role');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  const viewUserDetails = (user: User) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

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
        <div className="text-gray-500">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          User Management
        </h2>
        <p className="text-gray-600 mt-2">Manage customers and their bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-4 text-white">
          <p className="text-blue-100 text-sm mb-1">Total Users</p>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-4 text-white">
          <p className="text-purple-100 text-sm mb-1">Guests</p>
          <p className="text-3xl font-bold">{users.filter(u => u.role === 'GUEST').length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-4 text-white">
          <p className="text-orange-100 text-sm mb-1">Admins</p>
          <p className="text-3xl font-bold">{users.filter(u => u.role === 'ADMIN').length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-4 text-white">
          <p className="text-green-100 text-sm mb-1">Active Bookings</p>
          <p className="text-3xl font-bold">
            {users.reduce((sum, u) => sum + u.stats.confirmedBookings + u.stats.pendingBookings, 0)}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">All Roles</option>
            <option value="GUEST">Guests</option>
            <option value="ADMIN">Admins</option>
          </select>
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">ID: {user.id.substring(0, 8)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <FiMail className="text-gray-400" />
                      {user.email}
                    </div>
                    {user.phone && (
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <FiPhone className="text-gray-400" />
                        {user.phone}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'ADMIN'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {user.role === 'ADMIN' ? (
                        <span className="flex items-center gap-1">
                          <FiShield /> Admin
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <FiUser /> Guest
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.stats.totalBookings} total
                    </div>
                    <div className="text-xs text-gray-500">
                      {user.stats.confirmedBookings} confirmed
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${user.stats.totalSpent.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => viewUserDetails(user)}
                        className="text-primary-600 hover:text-primary-900 font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">User Details</h3>
              <button
                onClick={() => setShowUserDetails(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h4>
                      <p className="text-gray-600 flex items-center gap-1">
                        <FiMail /> {selectedUser.email}
                      </p>
                      {selectedUser.phone && (
                        <p className="text-gray-600 flex items-center gap-1">
                          <FiPhone /> {selectedUser.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-4 py-2 inline-flex text-sm font-semibold rounded-full ${
                        selectedUser.role === 'ADMIN'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {selectedUser.role}
                    </span>
                    <p className="text-sm text-gray-500 mt-2">
                      Member since {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role Management */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Role Management</h4>
                <div className="flex gap-3">
                  <button
                    onClick={() => updateUserRole(selectedUser.id, 'GUEST')}
                    disabled={selectedUser.role === 'GUEST'}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedUser.role === 'GUEST'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Set as Guest
                  </button>
                  <button
                    onClick={() => updateUserRole(selectedUser.id, 'ADMIN')}
                    disabled={selectedUser.role === 'ADMIN'}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedUser.role === 'ADMIN'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    Promote to Admin
                  </button>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 font-medium">Total Bookings</p>
                  <p className="text-2xl font-bold text-blue-900">{selectedUser.stats.totalBookings}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 font-medium">Confirmed</p>
                  <p className="text-2xl font-bold text-green-900">{selectedUser.stats.confirmedBookings}</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-sm text-yellow-600 font-medium">Pending</p>
                  <p className="text-2xl font-bold text-yellow-900">{selectedUser.stats.pendingBookings}</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-orange-600 font-medium">Total Spent</p>
                  <p className="text-2xl font-bold text-orange-900">
                    ${selectedUser.stats.totalSpent.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Booking History */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Booking History</h4>
                {selectedUser.bookings.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No bookings yet</p>
                ) : (
                  <div className="space-y-4">
                    {selectedUser.bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={booking.room.imageUrl}
                            alt={booking.room.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-semibold text-gray-900">{booking.room.name}</h5>
                                <p className="text-sm text-gray-500">
                                  Booking ID: {booking.id.substring(0, 8)}...
                                </p>
                              </div>
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                              <div className="flex items-center gap-1 text-gray-600">
                                <FiCalendar />
                                <span>
                                  {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                                  {new Date(booking.checkOut).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-600">
                                <FiUser />
                                <span>{booking.numberOfGuests} guests</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-600">
                                <FiDollarSign />
                                <span className="font-medium">${Number(booking.totalPrice).toFixed(2)}</span>
                              </div>
                              <div className="text-gray-500">
                                Booked: {new Date(booking.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                            {booking.payment && (
                              <div className="mt-2 text-sm">
                                <span className="text-gray-600">Payment: </span>
                                <span
                                  className={`font-medium ${
                                    booking.payment.status === 'COMPLETED'
                                      ? 'text-green-600'
                                      : 'text-yellow-600'
                                  }`}
                                >
                                  {booking.payment.status}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
