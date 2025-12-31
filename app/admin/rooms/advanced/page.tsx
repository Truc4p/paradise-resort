'use client';

import { useEffect, useState } from 'react';
import { FiCalendar, FiDollarSign, FiImage, FiTool, FiCheckSquare, FiSquare } from 'react-icons/fi';

interface Room {
  id: string;
  name: string;
  type: string;
  basePrice: number;
  images: string[];
  totalRooms: number;
  availableRooms: number;
  availabilityPercentage: number;
}

interface MaintenanceSchedule {
  id: string;
  roomId: string;
  roomName: string;
  startDate: string;
  endDate: string;
  description: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

interface SeasonalPricing {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  adjustmentType: 'percentage' | 'fixed';
  adjustmentValue: number;
  applicableRoomTypes: string[];
}

export default function AdvancedRoomManagement() {
  const [activeTab, setActiveTab] = useState<'bulk' | 'maintenance' | 'pricing' | 'gallery' | 'calendar'>('bulk');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [maintenanceSchedules, setMaintenanceSchedules] = useState<MaintenanceSchedule[]>([]);
  const [seasonalPricing, setSeasonalPricing] = useState<SeasonalPricing[]>([]);
  
  // Bulk operations state
  const [bulkOperation, setBulkOperation] = useState<'price' | 'inventory'>('price');
  const [priceAdjustment, setPriceAdjustment] = useState(0);
  const [adjustmentType, setAdjustmentType] = useState<'percentage' | 'fixed'>('percentage');
  const [inventoryChange, setInventoryChange] = useState(0);

  // Maintenance form state
  const [maintenanceForm, setMaintenanceForm] = useState({
    roomId: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  // Seasonal pricing form state
  const [pricingForm, setPricingForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    adjustmentType: 'percentage' as 'percentage' | 'fixed',
    adjustmentValue: 0,
    applicableRoomTypes: [] as string[],
  });

  // Calendar state
  const [calendarStartDate, setCalendarStartDate] = useState(() => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  });
  const [calendarEndDate, setCalendarEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  });

  // Gallery state
  const [selectedRoomForGallery, setSelectedRoomForGallery] = useState<string>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    loadRooms();
  }, [calendarStartDate, calendarEndDate]);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/rooms/advanced?startDate=${calendarStartDate}&endDate=${calendarEndDate}`
      );
      const result = await response.json();
      if (result.success) {
        setRooms(result.data);
      }
    } catch (error) {
      console.error('Error loading rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRoomSelection = (roomId: string) => {
    setSelectedRooms(prev =>
      prev.includes(roomId)
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const selectAllRooms = () => {
    if (selectedRooms.length === rooms.length) {
      setSelectedRooms([]);
    } else {
      setSelectedRooms(rooms.map(r => r.id));
    }
  };

  const handleBulkOperation = async () => {
    if (selectedRooms.length === 0) {
      alert('Please select at least one room');
      return;
    }

    try {
      const operation = bulkOperation === 'price' ? 'bulk-update-price' : 'bulk-update-inventory';
      const data = bulkOperation === 'price'
        ? { roomIds: selectedRooms, priceAdjustment, adjustmentType }
        : { roomIds: selectedRooms, inventoryChange };

      const response = await fetch('/api/admin/rooms/advanced', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation, data }),
      });

      const result = await response.json();
      if (result.success) {
        alert(result.data.message);
        setSelectedRooms([]);
        loadRooms();
      }
    } catch (error) {
      console.error('Error performing bulk operation:', error);
      alert('Failed to perform operation');
    }
  };

  const handleAddMaintenance = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const roomName = rooms.find(r => r.id === maintenanceForm.roomId)?.name || '';
    const newMaintenance: MaintenanceSchedule = {
      id: `maint-${Date.now()}`,
      roomName,
      status: 'scheduled',
      ...maintenanceForm,
    };

    setMaintenanceSchedules(prev => [...prev, newMaintenance]);
    setMaintenanceForm({
      roomId: '',
      startDate: '',
      endDate: '',
      description: '',
    });
    alert('Maintenance scheduled successfully');
  };

  const handleAddSeasonalPricing = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPricing: SeasonalPricing = {
      id: `price-${Date.now()}`,
      ...pricingForm,
    };

    setSeasonalPricing(prev => [...prev, newPricing]);
    setPricingForm({
      name: '',
      startDate: '',
      endDate: '',
      adjustmentType: 'percentage',
      adjustmentValue: 0,
      applicableRoomTypes: [],
    });
    alert('Seasonal pricing rule added successfully');
  };

  const handleUpdateGallery = async () => {
    if (!selectedRoomForGallery) {
      alert('Please select a room');
      return;
    }

    try {
      const response = await fetch('/api/admin/rooms/advanced', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'update-gallery',
          data: { roomId: selectedRoomForGallery, images: imageUrls },
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Gallery updated successfully');
        loadRooms();
      }
    } catch (error) {
      console.error('Error updating gallery:', error);
      alert('Failed to update gallery');
    }
  };

  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      setImageUrls(prev => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const removeImageUrl = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Advanced Room Management</h1>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('bulk')}
          className={`px-4 py-2 flex items-center gap-2 ${
            activeTab === 'bulk'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          <FiCheckSquare /> Bulk Operations
        </button>
        <button
          onClick={() => setActiveTab('maintenance')}
          className={`px-4 py-2 flex items-center gap-2 ${
            activeTab === 'maintenance'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          <FiTool /> Maintenance
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2 flex items-center gap-2 ${
            activeTab === 'pricing'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          <FiDollarSign /> Seasonal Pricing
        </button>
        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2 flex items-center gap-2 ${
            activeTab === 'gallery'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          <FiImage /> Photo Gallery
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`px-4 py-2 flex items-center gap-2 ${
            activeTab === 'calendar'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          <FiCalendar /> Calendar View
        </button>
      </div>

      {/* Bulk Operations Tab */}
      {activeTab === 'bulk' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Select Rooms</h2>
            <button
              onClick={selectAllRooms}
              className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              {selectedRooms.length === rooms.length ? 'Deselect All' : 'Select All'}
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms.map(room => (
                <div
                  key={room.id}
                  onClick={() => toggleRoomSelection(room.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition ${
                    selectedRooms.includes(room.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {selectedRooms.includes(room.id) ? (
                      <FiCheckSquare className="text-blue-500 text-xl mt-1" />
                    ) : (
                      <FiSquare className="text-gray-400 text-xl mt-1" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold">{room.name}</h3>
                      <p className="text-sm text-gray-600">{room.type}</p>
                      <p className="text-sm font-semibold text-green-600 mt-1">
                        ${room.basePrice}/night
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedRooms.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Bulk Operation ({selectedRooms.length} rooms selected)
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Operation Type</label>
                <select
                  value={bulkOperation}
                  onChange={(e) => setBulkOperation(e.target.value as 'price' | 'inventory')}
                  className="w-full p-2 border rounded"
                >
                  <option value="price">Update Price</option>
                  <option value="inventory">Update Inventory</option>
                </select>
              </div>

              {bulkOperation === 'price' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Adjustment Type</label>
                    <select
                      value={adjustmentType}
                      onChange={(e) => setAdjustmentType(e.target.value as 'percentage' | 'fixed')}
                      className="w-full p-2 border rounded"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount ($)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Adjustment Value {adjustmentType === 'percentage' ? '(%)' : '($)'}
                    </label>
                    <input
                      type="number"
                      value={priceAdjustment}
                      onChange={(e) => setPriceAdjustment(Number(e.target.value))}
                      className="w-full p-2 border rounded"
                      placeholder={adjustmentType === 'percentage' ? 'e.g., 10 for +10%' : 'e.g., 50 for +$50'}
                    />
                  </div>
                </div>
              )}

              {bulkOperation === 'inventory' && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Inventory Change (positive to add, negative to remove)
                  </label>
                  <input
                    type="number"
                    value={inventoryChange}
                    onChange={(e) => setInventoryChange(Number(e.target.value))}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., 2 to add 2 rooms, -1 to remove 1 room"
                  />
                </div>
              )}

              <button
                onClick={handleBulkOperation}
                className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Apply Bulk Operation
              </button>
            </div>
          )}
        </div>
      )}

      {/* Maintenance Tab */}
      {activeTab === 'maintenance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Schedule Maintenance</h2>
            <form onSubmit={handleAddMaintenance} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Room</label>
                <select
                  value={maintenanceForm.roomId}
                  onChange={(e) => setMaintenanceForm({ ...maintenanceForm, roomId: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select a room</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.id}>{room.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  value={maintenanceForm.startDate}
                  onChange={(e) => setMaintenanceForm({ ...maintenanceForm, startDate: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="date"
                  value={maintenanceForm.endDate}
                  onChange={(e) => setMaintenanceForm({ ...maintenanceForm, endDate: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={maintenanceForm.description}
                  onChange={(e) => setMaintenanceForm({ ...maintenanceForm, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={3}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Schedule Maintenance
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Maintenance Schedule</h2>
            {maintenanceSchedules.length === 0 ? (
              <p className="text-gray-500">No maintenance scheduled</p>
            ) : (
              <div className="space-y-3">
                {maintenanceSchedules.map(schedule => (
                  <div key={schedule.id} className="border p-4 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{schedule.roomName}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        schedule.status === 'completed' ? 'bg-green-100 text-green-800' :
                        schedule.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {schedule.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{schedule.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(schedule.startDate).toLocaleDateString()} - {new Date(schedule.endDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Seasonal Pricing Tab */}
      {activeTab === 'pricing' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add Seasonal Pricing Rule</h2>
            <form onSubmit={handleAddSeasonalPricing} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rule Name</label>
                <input
                  type="text"
                  value={pricingForm.name}
                  onChange={(e) => setPricingForm({ ...pricingForm, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="e.g., Summer Peak Season"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  value={pricingForm.startDate}
                  onChange={(e) => setPricingForm({ ...pricingForm, startDate: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="date"
                  value={pricingForm.endDate}
                  onChange={(e) => setPricingForm({ ...pricingForm, endDate: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Adjustment Type</label>
                <select
                  value={pricingForm.adjustmentType}
                  onChange={(e) => setPricingForm({ ...pricingForm, adjustmentType: e.target.value as 'percentage' | 'fixed' })}
                  className="w-full p-2 border rounded"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Adjustment Value {pricingForm.adjustmentType === 'percentage' ? '(%)' : '($)'}
                </label>
                <input
                  type="number"
                  value={pricingForm.adjustmentValue}
                  onChange={(e) => setPricingForm({ ...pricingForm, adjustmentValue: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Applicable Room Types</label>
                <select
                  multiple
                  value={pricingForm.applicableRoomTypes}
                  onChange={(e) => setPricingForm({
                    ...pricingForm,
                    applicableRoomTypes: Array.from(e.target.selectedOptions, option => option.value)
                  })}
                  className="w-full p-2 border rounded"
                  size={4}
                >
                  {Array.from(new Set(rooms.map(r => r.type))).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Add Pricing Rule
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Active Pricing Rules</h2>
            {seasonalPricing.length === 0 ? (
              <p className="text-gray-500">No pricing rules defined</p>
            ) : (
              <div className="space-y-3">
                {seasonalPricing.map(rule => (
                  <div key={rule.id} className="border p-4 rounded">
                    <h3 className="font-semibold mb-2">{rule.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {rule.adjustmentType === 'percentage' ? `${rule.adjustmentValue}%` : `$${rule.adjustmentValue}`} adjustment
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      {new Date(rule.startDate).toLocaleDateString()} - {new Date(rule.endDate).toLocaleDateString()}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {rule.applicableRoomTypes.map(type => (
                        <span key={type} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Photo Gallery Tab */}
      {activeTab === 'gallery' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Manage Room Photo Gallery</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Room</label>
            <select
              value={selectedRoomForGallery}
              onChange={(e) => {
                setSelectedRoomForGallery(e.target.value);
                const room = rooms.find(r => r.id === e.target.value);
                setImageUrls(room?.images || []);
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">Choose a room</option>
              {rooms.map(room => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>
          </div>

          {selectedRoomForGallery && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={addImageUrl}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Image
                </button>
              </div>

              {imageUrls.length > 0 && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Room image ${index + 1}`}
                          className="w-full h-32 object-cover rounded"
                        />
                        <button
                          onClick={() => removeImageUrl(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleUpdateGallery}
                    className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  >
                    Save Gallery
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Calendar View Tab */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Availability Calendar</h2>
            
            <div className="flex gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  value={calendarStartDate}
                  onChange={(e) => setCalendarStartDate(e.target.value)}
                  className="p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="date"
                  value={calendarEndDate}
                  onChange={(e) => setCalendarEndDate(e.target.value)}
                  className="p-2 border rounded"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Room</th>
                    <th className="text-center p-3">Total Rooms</th>
                    <th className="text-center p-3">Booked</th>
                    <th className="text-center p-3">Available</th>
                    <th className="text-center p-3">Availability %</th>
                    <th className="text-center p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map(room => (
                    <tr key={room.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div>
                          <p className="font-semibold">{room.name}</p>
                          <p className="text-sm text-gray-600">{room.type}</p>
                        </div>
                      </td>
                      <td className="text-center p-3">{room.totalRooms}</td>
                      <td className="text-center p-3">{room.totalRooms - room.availableRooms}</td>
                      <td className="text-center p-3 font-semibold">{room.availableRooms}</td>
                      <td className="text-center p-3">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                room.availabilityPercentage > 50
                                  ? 'bg-green-500'
                                  : room.availabilityPercentage > 25
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${room.availabilityPercentage}%` }}
                            />
                          </div>
                          <span className="text-sm">{room.availabilityPercentage}%</span>
                        </div>
                      </td>
                      <td className="text-center p-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          room.availableRooms === 0
                            ? 'bg-red-100 text-red-800'
                            : room.availabilityPercentage > 50
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {room.availableRooms === 0 ? 'Fully Booked' : room.availabilityPercentage > 50 ? 'Available' : 'Limited'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
