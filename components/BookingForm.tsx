'use client';

import { useState } from 'react';
import { FaCalendarAlt, FaUser, FaChevronDown } from 'react-icons/fa';

interface BookingFormProps {
  roomId?: string;
  roomName?: string;
  basePrice?: number;
}

export default function BookingForm({ roomId, roomName, basePrice }: BookingFormProps) {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    roomId: roomId || '',
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkAvailability = async () => {
    if (!formData.checkIn || !formData.checkOut) return;

    try {
      const response = await fetch(
        `/api/availability?checkIn=${formData.checkIn}&checkOut=${formData.checkOut}`
      );
      const data = await response.json();
      setAvailableRooms(data.filter((room: any) => room.isAvailable));

      // Calculate price if room selected
      if (formData.roomId && basePrice) {
        const nights = Math.ceil(
          (new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        setTotalPrice(basePrice * nights);
      }
    } catch (err) {
      console.error('Error checking availability:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // In a real app, you'd create/authenticate the user first
      // For now, we'll create a mock user
      const userResponse = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: 'temporary', // In production, handle this properly
        }),
      });

      const user = await userResponse.json();

      // Create booking
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          roomId: formData.roomId,
          checkIn: formData.checkIn,
          checkOut: formData.checkOut,
          numberOfGuests: formData.guests,
          specialRequests: formData.specialRequests,
          paymentMethod: 'credit_card',
        }),
      });

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        throw new Error(errorData.error || 'Failed to create booking');
      }

      const booking = await bookingResponse.json();
      setSuccess(true);
      
      // Reset form
      setFormData({
        checkIn: '',
        checkOut: '',
        guests: 2,
        roomId: roomId || '',
        name: '',
        email: '',
        phone: '',
        specialRequests: '',
      });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
      <h2 className="text-4xl font-bold mb-8 text-gray-900">
        {roomName ? `Book ${roomName}` : 'Book Your Stay'}
      </h2>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl">
          Booking submitted successfully! We'll send you a confirmation email shortly.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Selection */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Check-In Date
            </label>
            <div className="relative">
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={(e) => {
                  handleChange(e);
                  checkAvailability();
                }}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-gray-900 font-medium"
              />
              <FaCalendarAlt className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Check-Out Date
            </label>
            <div className="relative">
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={(e) => {
                  handleChange(e);
                  checkAvailability();
                }}
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-gray-900 font-medium"
              />
              <FaCalendarAlt className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Number of Guests
          </label>
          <div className="relative">
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-gray-900 font-medium appearance-none"
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Room Selection (if not pre-selected) */}
        {!roomId && availableRooms.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Room
            </label>
            <select
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              required
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-gray-900 font-medium"
            >
              <option value="">Choose a room...</option>
              {availableRooms.map((room) => (
                <option key={room.roomId} value={room.roomId}>
                  {room.roomName} - ${room.basePrice} per night ({room.availableRooms} available)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Guest Information */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Guest Information</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-gray-900 font-medium"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-gray-900 font-medium"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-gray-900 font-medium"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Special Requests (Optional)
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows={4}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-gray-900 font-medium resize-none"
                placeholder="Any special requirements or requests..."
              />
            </div>
          </div>
        </div>

        {/* Price Summary */}
        {totalPrice > 0 && (
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">Total Price</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary text-lg uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Complete Booking'}
        </button>

        <p className="text-sm text-gray-500 text-center font-light">
          By completing this booking, you agree to our Terms of Service and Privacy Policy
        </p>
      </form>
    </div>
  );
}
