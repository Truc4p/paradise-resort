'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FiDownload, FiDollarSign, FiClock, FiRefreshCw, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string | null;
  paidAt: string | null;
  createdAt: string;
  booking: {
    id: string;
    checkIn: string;
    checkOut: string;
    status: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    room: {
      id: string;
      name: string;
    };
  };
}

interface FinancialData {
  summary: {
    totalRevenue: number;
    pendingAmount: number;
    refundedAmount: number;
    failedAmount: number;
    completedCount: number;
    pendingCount: number;
    failedCount: number;
    refundedCount: number;
    totalTransactions: number;
  };
  charts: {
    revenueByDate: { date: string; amount: number }[];
    paymentMethods: { method: string; count: number; amount: number }[];
    statusBreakdown: { status: string; count: number; amount: number }[];
  };
  payments: Payment[];
  recentTransactions: Payment[];
}

const STATUS_COLORS: any = {
  COMPLETED: '#059669',
  PENDING: '#D97706',
  FAILED: '#DC2626',
  REFUNDED: '#7C3AED',
};

export default function FinancePage() {
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (statusFilter) params.append('paymentStatus', statusFilter);

      const res = await fetch(`/api/admin/finance?${params.toString()}`);
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching financial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      alert('Start date must be before end date');
      return;
    }
    fetchFinancialData();
  };

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setStatusFilter('');
    fetchFinancialData();
  };

  const updatePaymentStatus = async (paymentId: string, newStatus: string) => {
    if (!confirm(`Are you sure you want to change payment status to ${newStatus}?`)) {
      return;
    }

    try {
      const res = await fetch('/api/admin/finance', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId, paymentStatus: newStatus }),
      });

      const result = await res.json();
      if (result.success) {
        alert(result.message);
        fetchFinancialData();
        setShowPaymentModal(false);
      } else {
        alert(result.error || 'Failed to update payment');
      }
    } catch (error) {
      console.error('Error updating payment:', error);
      alert('Failed to update payment status');
    }
  };

  const exportToCSV = () => {
    if (!data) return;

    const headers = [
      'Payment ID',
      'Booking ID',
      'Customer Name',
      'Customer Email',
      'Room',
      'Amount',
      'Payment Method',
      'Status',
      'Transaction ID',
      'Paid At',
      'Created At',
    ];

    const rows = data.payments.map(payment => [
      payment.id,
      payment.bookingId,
      payment.booking.user.name,
      payment.booking.user.email,
      payment.booking.room.name,
      payment.amount,
      payment.paymentMethod,
      payment.paymentStatus,
      payment.transactionId || 'N/A',
      payment.paidAt ? new Date(payment.paidAt).toLocaleString() : 'N/A',
      new Date(payment.createdAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'REFUNDED':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <FiCheckCircle className="text-green-600" />;
      case 'PENDING':
        return <FiClock className="text-yellow-600" />;
      case 'FAILED':
        return <FiAlertCircle className="text-red-600" />;
      case 'REFUNDED':
        return <FiRefreshCw className="text-purple-600" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading financial data...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-red-500">
        Failed to load financial data
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Revenue & Finance
          </h2>
          <p className="text-gray-600 mt-2">Payment tracking and financial reports</p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <FiDownload /> Export to CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-green-100 text-sm font-medium">Total Revenue</p>
            <FiDollarSign className="text-2xl" />
          </div>
          <p className="text-3xl font-bold">${data.summary.totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-green-100 mt-1">{data.summary.completedCount} completed</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-yellow-100 text-sm font-medium">Pending</p>
            <FiClock className="text-2xl" />
          </div>
          <p className="text-3xl font-bold">${data.summary.pendingAmount.toLocaleString()}</p>
          <p className="text-sm text-yellow-100 mt-1">{data.summary.pendingCount} transactions</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm font-medium">Refunded</p>
            <FiRefreshCw className="text-2xl" />
          </div>
          <p className="text-3xl font-bold">${data.summary.refundedAmount.toLocaleString()}</p>
          <p className="text-sm text-purple-100 mt-1">{data.summary.refundedCount} refunds</p>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-red-100 text-sm font-medium">Failed</p>
            <FiAlertCircle className="text-2xl" />
          </div>
          <p className="text-3xl font-bold">${data.summary.failedAmount.toLocaleString()}</p>
          <p className="text-sm text-red-100 mt-1">{data.summary.failedCount} failed</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100 text-sm font-medium">Total Transactions</p>
            <FiDollarSign className="text-2xl" />
          </div>
          <p className="text-3xl font-bold">{data.summary.totalTransactions}</p>
          <p className="text-sm text-blue-100 mt-1">All payments</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Reports</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Status</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={handleFilter}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.charts.revenueByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `$${value.toFixed(2)}`}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#059669" strokeWidth={3} name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Status Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.charts.statusBreakdown}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ status, count }) => `${status}: ${count}`}
              >
                {data.charts.statusBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Revenue by Payment Method</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.charts.paymentMethods}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="method" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="amount" fill="#2563EB" name="Amount" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.recentTransactions.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {payment.id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{payment.booking.user.name}</div>
                    <div className="text-sm text-gray-500">{payment.booking.user.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{payment.booking.room.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${Number(payment.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{payment.paymentMethod}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 inline-flex items-center gap-1 text-xs font-semibold rounded-full ${getStatusColor(payment.paymentStatus)}`}>
                      {getStatusIcon(payment.paymentStatus)}
                      {payment.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => {
                        setSelectedPayment(payment);
                        setShowPaymentModal(true);
                      }}
                      className="text-primary-600 hover:text-primary-900 font-medium"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Management Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Payment Management</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Payment ID</p>
                  <p className="font-medium">{selectedPayment.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium text-lg">${Number(selectedPayment.amount).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{selectedPayment.booking.user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium">{selectedPayment.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Status</p>
                  <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(selectedPayment.paymentStatus)}`}>
                    {selectedPayment.paymentStatus}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-medium">{selectedPayment.transactionId || 'N/A'}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Update Payment Status</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => updatePaymentStatus(selectedPayment.id, 'COMPLETED')}
                    disabled={selectedPayment.paymentStatus === 'COMPLETED'}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedPayment.paymentStatus === 'COMPLETED'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => updatePaymentStatus(selectedPayment.id, 'PENDING')}
                    disabled={selectedPayment.paymentStatus === 'PENDING'}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedPayment.paymentStatus === 'PENDING'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-yellow-600 text-white hover:bg-yellow-700'
                    }`}
                  >
                    Set to Pending
                  </button>
                  <button
                    onClick={() => updatePaymentStatus(selectedPayment.id, 'REFUNDED')}
                    disabled={selectedPayment.paymentStatus === 'REFUNDED'}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedPayment.paymentStatus === 'REFUNDED'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    Process Refund
                  </button>
                  <button
                    onClick={() => updatePaymentStatus(selectedPayment.id, 'FAILED')}
                    disabled={selectedPayment.paymentStatus === 'FAILED'}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedPayment.paymentStatus === 'FAILED'
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    Mark as Failed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
