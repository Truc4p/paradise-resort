'use client';

import { useEffect, useState } from 'react';

interface Room {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  maxGuests: number;
  size: number;
  bedType: string;
  imageUrl: string;
  inventory: { totalRooms: number; availableRooms: number }[];
}

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    basePrice: '',
    maxGuests: '',
    size: '',
    bedType: 'King',
    imageUrl: '',
    totalRooms: '',
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch('/api/rooms');
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const payload = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        basePrice: parseFloat(formData.basePrice),
        maxGuests: parseInt(formData.maxGuests),
        size: parseInt(formData.size),
        bedType: formData.bedType,
        imageUrl: formData.imageUrl,
        images: [formData.imageUrl],
        amenityIds: [],
        totalRooms: parseInt(formData.totalRooms),
      };

      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Room created successfully!');
        setShowAddForm(false);
        setFormData({
          name: '',
          slug: '',
          description: '',
          basePrice: '',
          maxGuests: '',
          size: '',
          bedType: 'King',
          imageUrl: '',
          totalRooms: '',
        });
        fetchRooms();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || 'Failed to create room'}`);
      }
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading rooms...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Room Management</h2>
          <p className="text-gray-600 mt-2">Manage your resort's rooms, pricing, and inventory</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium transform hover:-translate-y-0.5"
        >
          {showAddForm ? '✕ Cancel' : '+ Add New Room'}
        </button>
      </div>

      {/* Add Room Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900">Add New Room</h3>
            <p className="text-sm text-gray-600 mt-1">Fill in the details for the new room</p>
          </div>
          <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Deluxe Ocean View"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="deluxe-ocean-view"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the room..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Price ($) *
                </label>
                <input
                  type="number"
                  name="basePrice"
                  value={formData.basePrice}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="299.99"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Guests *
                </label>
                <input
                  type="number"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size (sq ft) *
                </label>
                <input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="450"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bed Type *
                </label>
                <select
                  name="bedType"
                  value={formData.bedType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="King">King</option>
                  <option value="Queen">Queen</option>
                  <option value="Twin">Twin</option>
                  <option value="Double">Double</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Rooms Available *
                </label>
                <input
                  type="number"
                  name="totalRooms"
                  value={formData.totalRooms}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="5"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/room-image.jpg"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
              >
                Create Room
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
          </div>
        </div>
      )}

      {/* Rooms List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-white">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Room Name
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Max Guests
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Size
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Bed Type
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Inventory
                </th>
                <th className="text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No rooms available. Add your first room to get started.
                  </td>
                </tr>
              ) : (
                rooms.map((room) => (
                  <tr key={room.id} className="border-t border-gray-100 hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent transition-all">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={room.imageUrl}
                          alt={room.name}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{room.name}</div>
                          <div className="text-xs text-gray-500">{room.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      ${Number(room.basePrice).toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-gray-900">{room.maxGuests}</td>
                    <td className="py-3 px-4 text-gray-600">{room.size} sq ft</td>
                    <td className="py-3 px-4 text-gray-600">{room.bedType}</td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-900">
                        {room.inventory[0]?.totalRooms || 0} total
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
