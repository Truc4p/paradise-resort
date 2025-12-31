'use client';

import { useEffect, useState } from 'react';
import { FiMail, FiMessageSquare, FiSend, FiUsers, FiFileText, FiClock } from 'react-icons/fi';

interface Booking {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  room: {
    id: string;
    name: string;
    type: string;
  };
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
}

interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  message: string;
  category: string;
}

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState<'booking' | 'bulk' | 'sms' | 'templates'>('booking');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [allCustomers, setAllCustomers] = useState<any[]>([]);
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  
  // Booking communication state
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [bookingFilter, setBookingFilter] = useState<'all' | 'upcoming' | 'checkingInTomorrow' | 'checkingOutToday'>('upcoming');

  // Bulk email state
  const [bulkSubject, setBulkSubject] = useState('');
  const [bulkMessage, setBulkMessage] = useState('');
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  // SMS state
  const [smsMessage, setSmsMessage] = useState('');
  const [selectedPhone, setSelectedPhone] = useState<string[]>([]);

  useEffect(() => {
    loadTemplates();
    loadCustomers();
  }, []);

  useEffect(() => {
    loadBookings();
  }, [bookingFilter]);

  const loadBookings = async () => {
    setLoading(true);
    try {
      let url = '/api/admin/communications?';
      
      switch (bookingFilter) {
        case 'upcoming':
          url += 'upcoming=true';
          break;
        case 'checkingInTomorrow':
          url += 'checkingInTomorrow=true';
          break;
        case 'checkingOutToday':
          url += 'checkingOutToday=true';
          break;
        default:
          url += 'status=CONFIRMED';
      }

      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        setBookings(result.data);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCustomers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const result = await response.json();
      if (result.success) {
        setAllCustomers(result.data.users);
      }
    } catch (error) {
      console.error('Error loading customers:', error);
    }
  };

  const loadTemplates = async () => {
    try {
      const response = await fetch('/api/admin/communications?type=templates');
      const result = await response.json();
      if (result.success) {
        setTemplates(result.data);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const applyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setEmailSubject(template.subject);
      setEmailMessage(template.message);
    }
  };

  const fillTemplateVariables = (text: string, booking: Booking) => {
    return text
      .replace(/{{guestName}}/g, booking.user.name)
      .replace(/{{bookingId}}/g, booking.id)
      .replace(/{{roomName}}/g, booking.room.name)
      .replace(/{{checkIn}}/g, new Date(booking.checkIn).toLocaleDateString())
      .replace(/{{checkOut}}/g, new Date(booking.checkOut).toLocaleDateString())
      .replace(/{{totalAmount}}/g, booking.totalPrice.toString());
  };

  const toggleBookingSelection = (bookingId: string) => {
    setSelectedBookings(prev =>
      prev.includes(bookingId)
        ? prev.filter(id => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  const selectAllBookings = () => {
    if (selectedBookings.length === bookings.length) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(bookings.map(b => b.id));
    }
  };

  const sendBookingEmails = async () => {
    if (selectedBookings.length === 0) {
      alert('Please select at least one booking');
      return;
    }

    if (!emailSubject || !emailMessage) {
      alert('Please enter subject and message');
      return;
    }

    const selectedBookingData = bookings.filter(b => selectedBookings.includes(b.id));
    const recipients = selectedBookingData.map(b => ({
      email: b.user.email,
      name: b.user.name,
      booking: b,
    }));

    try {
      setLoading(true);
      const response = await fetch('/api/admin/communications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'send-email',
          data: {
            recipients: recipients.map(r => ({
              email: r.email,
              subject: fillTemplateVariables(emailSubject, r.booking),
              message: fillTemplateVariables(emailMessage, r.booking),
            })),
            subject: emailSubject,
            message: emailMessage,
            messageType: 'booking notification',
          },
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert(result.data.message);
        setSelectedBookings([]);
      }
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('Failed to send emails');
    } finally {
      setLoading(false);
    }
  };

  const sendBulkEmail = async () => {
    if (selectedCustomers.length === 0) {
      alert('Please select at least one customer');
      return;
    }

    if (!bulkSubject || !bulkMessage) {
      alert('Please enter subject and message');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/admin/communications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'bulk-email',
          data: {
            userEmails: allCustomers
              .filter(c => selectedCustomers.includes(c.id))
              .map(c => c.email),
            bulkSubject,
            bulkMessage,
          },
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert(result.data.message);
        setSelectedCustomers([]);
        setBulkSubject('');
        setBulkMessage('');
      }
    } catch (error) {
      console.error('Error sending bulk email:', error);
      alert('Failed to send bulk email');
    } finally {
      setLoading(false);
    }
  };

  const sendSMS = async () => {
    if (selectedPhone.length === 0) {
      alert('Please select at least one recipient');
      return;
    }

    if (!smsMessage) {
      alert('Please enter SMS message');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/admin/communications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'send-sms',
          data: {
            phoneNumbers: selectedPhone,
            smsMessage,
          },
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert(result.data.message + '\n\nNote: SMS integration requires Twilio or similar service to be configured.');
        setSelectedPhone([]);
        setSmsMessage('');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      alert('Failed to send SMS');
    } finally {
      setLoading(false);
    }
  };

  const toggleCustomerSelection = (customerId: string) => {
    setSelectedCustomers(prev =>
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const selectAllCustomers = () => {
    if (selectedCustomers.length === allCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(allCustomers.map(c => c.id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Communications</h1>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('booking')}
          className={`px-4 py-2 flex items-center gap-2 ${
            activeTab === 'booking'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          <FiMail /> Booking Communications
        </button>
        <button
          onClick={() => setActiveTab('bulk')}
          className={`px-4 py-2 flex items-center gap-2 ${
            activeTab === 'bulk'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          <FiUsers /> Bulk Email
        </button>
        <button
          onClick={() => setActiveTab('sms')}
          className={`px-4 py-2 flex items-center gap-2 ${
            activeTab === 'sms'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          <FiMessageSquare /> SMS Notifications
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 flex items-center gap-2 ${
            activeTab === 'templates'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          <FiFileText /> Message Templates
        </button>
      </div>

      {/* Booking Communications Tab */}
      {activeTab === 'booking' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Select Recipients</h2>
                <select
                  value={bookingFilter}
                  onChange={(e) => setBookingFilter(e.target.value as any)}
                  className="p-2 border rounded"
                >
                  <option value="all">All Confirmed</option>
                  <option value="upcoming">Upcoming Bookings</option>
                  <option value="checkingInTomorrow">Checking In Tomorrow</option>
                  <option value="checkingOutToday">Checking Out Today</option>
                </select>
              </div>

              <button
                onClick={selectAllBookings}
                className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                {selectedBookings.length === bookings.length ? 'Deselect All' : 'Select All'}
              </button>

              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : bookings.length === 0 ? (
                <p className="text-gray-500">No bookings found for selected filter</p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {bookings.map(booking => (
                    <div
                      key={booking.id}
                      onClick={() => toggleBookingSelection(booking.id)}
                      className={`p-4 border rounded cursor-pointer transition ${
                        selectedBookings.includes(booking.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{booking.user.name}</p>
                          <p className="text-sm text-gray-600">{booking.user.email}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {booking.room.name} • {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedBookings.includes(booking.id)}
                          onChange={() => {}}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Compose Message</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Use Template</label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => applyTemplate(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select a template...</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Email subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows={12}
                    placeholder="Email message..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Available variables: {'{'}{'{'} guestName{'}'}{'}'}, {'{{'}bookingId{'}'}{'}'}, {'{{'}roomName{'}'}{'}'}, {'{{'}checkIn{'}'}{'}'}, {'{{'}checkOut{'}'}{'}'}, {'{{'}totalAmount{'}'}{'}'}
                  </p>
                </div>

                <button
                  onClick={sendBookingEmails}
                  disabled={loading || selectedBookings.length === 0}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FiSend /> Send to {selectedBookings.length} Recipient(s)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Email Tab */}
      {activeTab === 'bulk' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Select Customers</h2>
              
              <button
                onClick={selectAllCustomers}
                className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                {selectedCustomers.length === allCustomers.length ? 'Deselect All' : 'Select All'}
              </button>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {allCustomers.map(customer => (
                  <div
                    key={customer.id}
                    onClick={() => toggleCustomerSelection(customer.id)}
                    className={`p-4 border rounded cursor-pointer transition ${
                      selectedCustomers.includes(customer.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {customer._count?.bookings || 0} booking(s)
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => {}}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Compose Bulk Email</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    value={bulkSubject}
                    onChange={(e) => setBulkSubject(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Email subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={bulkMessage}
                    onChange={(e) => setBulkMessage(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows={15}
                    placeholder="Email message..."
                  />
                </div>

                <button
                  onClick={sendBulkEmail}
                  disabled={loading || selectedCustomers.length === 0}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FiSend /> Send to {selectedCustomers.length} Customer(s)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SMS Tab */}
      {activeTab === 'sms' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Select Recipients</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> SMS functionality requires integration with a service like Twilio, AWS SNS, or similar. 
                  This interface demonstrates the feature but will simulate sending.
                </p>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {bookings.filter(b => b.user.phone).map(booking => (
                  <div
                    key={booking.id}
                    onClick={() => {
                      const phone = booking.user.phone!;
                      setSelectedPhone(prev =>
                        prev.includes(phone)
                          ? prev.filter(p => p !== phone)
                          : [...prev, phone]
                      );
                    }}
                    className={`p-4 border rounded cursor-pointer transition ${
                      selectedPhone.includes(booking.user.phone!)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{booking.user.name}</p>
                        <p className="text-sm text-gray-600">{booking.user.phone}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {booking.room.name}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedPhone.includes(booking.user.phone!)}
                        onChange={() => {}}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Compose SMS</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message ({smsMessage.length}/160 characters)
                  </label>
                  <textarea
                    value={smsMessage}
                    onChange={(e) => setSmsMessage(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows={8}
                    maxLength={160}
                    placeholder="SMS message (max 160 characters)..."
                  />
                </div>

                <button
                  onClick={sendSMS}
                  disabled={loading || selectedPhone.length === 0}
                  className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FiMessageSquare /> Send SMS to {selectedPhone.length} Recipient(s)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Message Templates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map(template => (
              <div key={template.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{template.name}</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-2">{template.subject}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-4">{template.message}</p>
                <button
                  onClick={() => {
                    setActiveTab('booking');
                    applyTemplate(template.id);
                  }}
                  className="w-full text-sm bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
