'use client';

import { useEffect, useState } from 'react';
import { Mail, Trash2, X, RefreshCw } from 'lucide-react';
import { contactAPI } from '@/lib/api';

interface Contact {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  loanType: string;
  message: string;
  notes: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export default function ContactDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notesModal, setNotesModal] = useState<{
    visible: boolean;
    contactId: string | null;
    notes: string;
  }>({
    visible: false,
    contactId: null,
    notes: ''
  });

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

  const handleMarkContacted = (contactId: string, currentNotes: string) => {
    setNotesModal({
      visible: true,
      contactId,
      notes: currentNotes
    });
  };

  const handleSaveNotes = async () => {
    if (!notesModal.contactId) return;

    try {
      const response = await contactAPI.updateStatus(
        notesModal.contactId,
        'contacted',
        notesModal.notes
      );
      if (response.data.success) {
        setContacts(contacts.map(c =>
          c._id === notesModal.contactId
            ? { ...c, status: 'contacted', notes: notesModal.notes }
            : c
        ));
        setNotesModal({ visible: false, contactId: null, notes: '' });
      }
    } catch (err) {
      console.error('Failed to update contact:', err);
    }
  };

  const handleMarkResolved = async (id: string) => {
    try {
      const contact = contacts.find(c => c._id === id);
      const response = await contactAPI.updateStatus(
        id,
        'resolved',
        contact?.notes || ''
      );
      if (response.data.success) {
        setContacts(contacts.map(c =>
          c._id === id ? { ...c, status: 'resolved' } : c
        ));
      }
    } catch (err) {
      console.error('Failed to update contact:', err);
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

  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    contacted: contacts.filter(c => c.status === 'contacted').length,
    resolved: contacts.filter(c => c.status === 'resolved').length,
  };

  const getStatusBadge = (status: string) => {
    const badgeConfig = {
      new: 'bg-red-100 text-red-700',
      contacted: 'bg-yellow-100 text-yellow-700',
      resolved: 'bg-green-100 text-green-700'
    };
    return badgeConfig[status as keyof typeof badgeConfig] || '';
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <p className="text-gray-600 text-sm font-medium">Total</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-red-100">
          <p className="text-red-600 text-sm font-medium">New</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.new}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-yellow-100">
          <p className="text-yellow-600 text-sm font-medium">Contacted</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.contacted}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 border border-green-100">
          <p className="text-green-600 text-sm font-medium">Resolved</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.resolved}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mb-2" />
            <p className="text-gray-600">Loading contacts...</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="p-8 text-center">
            <Mail size={40} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">No contact messages yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Phone</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Loan Type</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Message</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Notes</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-medium">{contact.name}</td>
                    <td className="px-6 py-4 text-gray-600">{contact.mobile}</td>
                    <td className="px-6 py-4 text-gray-600">{contact.loanType}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={contact.message}>
                      {contact.message || '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={contact.notes}>
                      {contact.notes || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(contact.status)}`}>
                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {contact.status === 'new' ? (
                        <button
                          onClick={() => handleMarkContacted(contact._id, contact.notes)}
                          className="px-3 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors"
                        >
                          Mark Contacted
                        </button>
                      ) : contact.status === 'contacted' ? (
                        <button
                          onClick={() => handleMarkResolved(contact._id)}
                          className="px-3 py-1 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                        >
                          Mark Resolved
                        </button>
                      ) : (
                        <span className="px-3 py-1 text-xs font-medium rounded bg-green-100 text-green-700">
                          Resolved
                        </span>
                      )}
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="px-3 py-1 text-xs font-medium rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Notes Modal */}
      {notesModal.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Add Notes</h3>
              <button
                onClick={() => setNotesModal({ visible: false, contactId: null, notes: '' })}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Admin Notes
              </label>
              <textarea
                value={notesModal.notes}
                onChange={(e) =>
                  setNotesModal({ ...notesModal, notes: e.target.value })
                }
                placeholder="Add your notes here... (e.g., customer called, interested in refinancing, follow up next week)"
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setNotesModal({ visible: false, contactId: null, notes: '' })}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Mark Contacted
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
