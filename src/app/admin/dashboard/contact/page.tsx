'use client';

import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Trash2, Eye, RefreshCw } from 'lucide-react';
import { contactAPI } from '@/lib/api';

interface Contact {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  loanType: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export default function ContactDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await contactAPI.getAll();
      if (response.data.success) {
        setContacts(response.data.contacts);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'new' | 'contacted' | 'resolved') => {
    try {
      const response = await contactAPI.updateStatus(id, newStatus);
      if (response.data.success) {
        setContacts(contacts.map(c => c._id === id ? { ...c, status: newStatus } : c));
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      const response = await contactAPI.delete(id);
      if (response.data.success) {
        setContacts(contacts.filter(c => c._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete contact:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    contacted: contacts.filter(c => c.status === 'contacted').length,
    resolved: contacts.filter(c => c.status === 'resolved').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Contact Messages</h2>
          <p className="text-gray-600 mt-2">Manage and respond to customer inquiries</p>
        </div>
        <button
          onClick={fetchContacts}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Messages</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <Mail size={28} className="text-blue-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">New</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.new}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <span className="text-red-600 font-bold">●</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Contacted</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.contacted}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 font-bold">●</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Resolved</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.resolved}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold">●</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mb-2" />
            <p className="text-gray-600">Loading contacts...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
            <Mail size={40} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">No contact messages yet</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{contact.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      contact.status === 'new' ? 'bg-red-100 text-red-700' :
                      contact.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{contact.loanType}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600">
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={16} />
                  <span>{contact.email || 'No email provided'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} />
                  <span>{contact.mobile}</span>
                </div>
              </div>

              {contact.message && (
                <p className="text-gray-700 text-sm leading-relaxed mb-4 bg-gray-50 p-3 rounded">
                  {contact.message}
                </p>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">{formatDate(contact.createdAt)}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(contact._id, 'contacted')}
                    disabled={contact.status === 'contacted'}
                    className="px-3 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200 disabled:opacity-50 transition-colors"
                  >
                    Mark Contacted
                  </button>
                  <button
                    onClick={() => handleStatusChange(contact._id, 'resolved')}
                    disabled={contact.status === 'resolved'}
                    className="px-3 py-1 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50 transition-colors"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
