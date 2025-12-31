'use client';

import { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiCheckCircle, FiMail, FiTag, FiImage } from 'react-icons/fi';

interface Amenity {
  id: string;
  name: string;
  icon: string;
  description: string | null;
  _count: {
    rooms: number;
  };
}

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  code: string | null;
  createdAt: string;
}

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface Subscriber {
  id: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt: string | null;
}

interface ContentData {
  amenities: Amenity[];
  offers: Offer[];
  messages: Message[];
  subscribers: Subscriber[];
}

export default function ContentPage() {
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('amenities');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'amenity' | 'offer'>('amenity');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/content');
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type: 'amenity' | 'offer', item: any = null) => {
    setModalType(type);
    setEditingItem(item);
    
    if (type === 'amenity') {
      setFormData({
        name: item?.name || '',
        icon: item?.icon || '',
        description: item?.description || '',
      });
    } else if (type === 'offer') {
      setFormData({
        title: item?.title || '',
        description: item?.description || '',
        discount: item?.discount || '',
        validFrom: item?.validFrom?.split('T')[0] || '',
        validUntil: item?.validUntil?.split('T')[0] || '',
        isActive: item?.isActive ?? true,
        code: item?.code || '',
      });
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = '/api/admin/content';
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem
        ? { type: modalType, id: editingItem.id, data: formData }
        : { type: modalType, data: formData };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await res.json();
      if (result.success) {
        alert(result.message);
        fetchContent();
        closeModal();
      } else {
        alert(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save');
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/content?type=${type}&id=${id}`, {
        method: 'DELETE',
      });

      const result = await res.json();
      if (result.success) {
        alert(result.message);
        fetchContent();
      } else {
        alert(result.error || 'Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Failed to delete');
    }
  };

  const markMessageAsRead = async (id: string, isRead: boolean) => {
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'message',
          id,
          data: { isRead },
        }),
      });

      const result = await res.json();
      if (result.success) {
        fetchContent();
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading content...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-red-500">
        Failed to load content
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Content Management
        </h2>
        <p className="text-gray-600 mt-2">Manage amenities, offers, messages, and website content</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('amenities')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'amenities'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Amenities ({data.amenities.length})
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'offers'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Special Offers ({data.offers.length})
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'messages'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Messages ({data.messages.filter(m => !m.isRead).length})
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'subscribers'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Newsletter ({data.subscribers.length})
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'gallery'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Gallery & Content
          </button>
        </div>
      </div>

      {/* Amenities Tab */}
      {activeTab === 'amenities' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Amenities Management</h3>
            <button
              onClick={() => openModal('amenity')}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FiPlus /> Add Amenity
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.amenities.map((amenity) => (
              <div key={amenity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{amenity.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900">{amenity.name}</h4>
                      <p className="text-sm text-gray-500">{amenity._count.rooms} rooms</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal('amenity', amenity)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete('amenity', amenity.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                {amenity.description && (
                  <p className="text-sm text-gray-600">{amenity.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Offers Tab */}
      {activeTab === 'offers' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Special Offers</h3>
            <button
              onClick={() => openModal('offer')}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FiPlus /> Add Offer
            </button>
          </div>

          <div className="space-y-4">
            {data.offers.map((offer) => (
              <div key={offer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold text-gray-900">{offer.title}</h4>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          offer.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {offer.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {offer.code && (
                        <span className="px-3 py-1 text-xs font-mono font-semibold bg-blue-100 text-blue-800 rounded">
                          {offer.code}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{offer.description}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Discount</p>
                        <p className="font-bold text-orange-600">{offer.discount}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Valid From</p>
                        <p className="font-medium">{new Date(offer.validFrom).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Valid Until</p>
                        <p className="font-medium">{new Date(offer.validUntil).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => openModal('offer', offer)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete('offer', offer.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Messages</h3>

          <div className="space-y-4">
            {data.messages.map((message) => (
              <div
                key={message.id}
                className={`border rounded-lg p-4 ${
                  message.isRead
                    ? 'border-gray-200 bg-gray-50'
                    : 'border-blue-300 bg-blue-50'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <FiMail className={`text-2xl ${message.isRead ? 'text-gray-400' : 'text-blue-600'}`} />
                    <div>
                      <h4 className="font-bold text-gray-900">{message.name}</h4>
                      <p className="text-sm text-gray-600">{message.email}</p>
                      {message.phone && (
                        <p className="text-sm text-gray-600">{message.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => markMessageAsRead(message.id, !message.isRead)}
                      className={`px-3 py-1 text-sm rounded ${
                        message.isRead
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {message.isRead ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button
                      onClick={() => handleDelete('message', message.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 mb-2">{message.subject}</p>
                  <p className="text-gray-700">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subscribers Tab */}
      {activeTab === 'subscribers' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Newsletter Subscribers</h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscribed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{subscriber.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          subscriber.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {subscriber.isActive ? 'Active' : 'Unsubscribed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete('subscriber', subscriber.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Gallery & Content Tab */}
      {activeTab === 'gallery' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Gallery & Homepage Content</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FiImage className="text-6xl text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Gallery Images</h4>
              <p className="text-gray-600 mb-4">Upload and manage resort gallery images</p>
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Manage Gallery
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FiEdit2 className="text-6xl text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Homepage Content</h4>
              <p className="text-gray-600 mb-4">Edit hero section, features, and testimonials</p>
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Edit Content
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FiTag className="text-6xl text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Dining Options</h4>
              <p className="text-gray-600 mb-4">Manage restaurant menus and dining information</p>
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Manage Dining
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FiCheckCircle className="text-6xl text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Activities</h4>
              <p className="text-gray-600 mb-4">Add and update resort activities and experiences</p>
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Manage Activities
              </button>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Note:</strong> Gallery and content editing features can be enhanced with file upload capabilities
              and rich text editors. These are placeholder sections for future implementation.
            </p>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingItem ? 'Edit' : 'Add'} {modalType === 'amenity' ? 'Amenity' : 'Offer'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {modalType === 'amenity' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji)</label>
                    <input
                      type="text"
                      value={formData.icon || ''}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      required
                      placeholder="🏊 🍽️ 🏋️"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                    <input
                      type="number"
                      value={formData.discount || ''}
                      onChange={(e) => setFormData({ ...formData, discount: parseFloat(e.target.value) })}
                      required
                      min="0"
                      max="100"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
                      <input
                        type="date"
                        value={formData.validFrom || ''}
                        onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                      <input
                        type="date"
                        value={formData.validUntil || ''}
                        onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code (Optional)</label>
                    <input
                      type="text"
                      value={formData.code || ''}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="SUMMER2026"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive ?? true}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                      Active
                    </label>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  <FiSave /> Save
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
