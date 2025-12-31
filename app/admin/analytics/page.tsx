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

interface AnalyticsData {
  metrics: {
    totalRevenue: number;
    averageBookingValue: number;
    totalBookings: number;
    occupancyRate: number;
    totalRooms: number;
  };
  charts: {
    dailyRevenue: { date: string; revenue: number }[];
    dailyBookings: { date: string; bookings: number }[];
    weeklyRevenue: { week: string; revenue: number }[];
    monthlyRevenue: { month: string; revenue: number }[];
    popularRooms: { name: string; bookings: number; revenue: number }[];
    statusBreakdown: { status: string; count: number }[];
    heatmap: { day: string; hour: number; count: number }[];
  };
}

const COLORS = ['#D97706', '#EA580C', '#DC2626', '#7C3AED', '#2563EB', '#059669'];

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const [chartView, setChartView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/analytics?period=${period}`);
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading analytics...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-red-500">
        Failed to load analytics data
      </div>
    );
  }

  const getRevenueData = () => {
    switch (chartView) {
      case 'weekly':
        return data.charts.weeklyRevenue.map(item => ({
          name: new Date(item.week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          revenue: item.revenue,
        }));
      case 'monthly':
        return data.charts.monthlyRevenue.map(item => ({
          name: item.month,
          revenue: item.revenue,
        }));
      default:
        return data.charts.dailyRevenue.map(item => ({
          name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          revenue: item.revenue,
        }));
    }
  };

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Analytics & Reports
          </h2>
          <p className="text-gray-600 mt-2">Comprehensive insights into your resort's performance</p>
        </div>
        <div className="flex gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl shadow-lg p-6 text-white">
          <p className="text-orange-100 text-sm font-medium mb-2">Total Revenue</p>
          <p className="text-3xl font-bold">{formatCurrency(data.metrics.totalRevenue)}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
          <p className="text-blue-100 text-sm font-medium mb-2">Avg Booking Value</p>
          <p className="text-3xl font-bold">{formatCurrency(data.metrics.averageBookingValue)}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
          <p className="text-purple-100 text-sm font-medium mb-2">Total Bookings</p>
          <p className="text-3xl font-bold">{data.metrics.totalBookings}</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg p-6 text-white">
          <p className="text-green-100 text-sm font-medium mb-2">Occupancy Rate</p>
          <p className="text-3xl font-bold">{data.metrics.occupancyRate}%</p>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-lg p-6 text-white">
          <p className="text-red-100 text-sm font-medium mb-2">Total Rooms</p>
          <p className="text-3xl font-bold">{data.metrics.totalRooms}</p>
        </div>
      </div>

      {/* Revenue Trends */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Revenue Trends</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setChartView('daily')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                chartView === 'daily'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setChartView('weekly')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                chartView === 'weekly'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setChartView('monthly')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                chartView === 'monthly'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={getRevenueData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#D97706"
              strokeWidth={3}
              dot={{ fill: '#D97706', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Bookings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Daily Bookings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data.charts.dailyBookings.map(item => ({
                name: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                bookings: item.bookings,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#EA580C" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Status Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Booking Status</h3>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Popular Room Types */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Room Types</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data.charts.popularRooms} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip formatter={(value: number, name: string) => {
              if (name === 'revenue') return formatCurrency(value);
              return value;
            }} />
            <Legend />
            <Bar dataKey="bookings" fill="#7C3AED" name="Bookings" />
            <Bar dataKey="revenue" fill="#2563EB" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Peak Booking Periods Heatmap */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Peak Booking Periods</h3>
        <p className="text-gray-600 mb-4">Bookings by day of week and hour</p>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Hour</th>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <th key={day} className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 24 }, (_, hour) => {
                const hourData = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => {
                  const cell = data.charts.heatmap.find(h => h.day === day && h.hour === hour);
                  return cell ? cell.count : 0;
                });
                const maxCount = Math.max(...hourData, 1);

                return (
                  <tr key={hour}>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {hour.toString().padStart(2, '0')}:00
                    </td>
                    {hourData.map((count, idx) => {
                      const intensity = count / maxCount;
                      const bgColor = count === 0
                        ? 'bg-gray-50'
                        : `bg-orange-${Math.ceil(intensity * 5) * 100}`;
                      
                      return (
                        <td
                          key={idx}
                          className={`px-4 py-3 text-center text-sm ${bgColor} ${
                            count > 0 ? 'text-white font-medium' : 'text-gray-400'
                          }`}
                          title={`${count} bookings`}
                        >
                          {count || '-'}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
