'use client';

import { useEffect, useState } from 'react';
import { Zap, Trash2, X, RefreshCw, AlertTriangle } from 'lucide-react';
import { quickAPI } from '@/lib/api';

interface QuickInquiry {
  _id: string;
  loanType: string;
  mobileNumber: string;
  notes: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export default function QuickDashboard() {
  const [inquiries, setInquiries] = useState<QuickInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);
  const [notesModal, setNotesModal] = useState<{
    visible: boolean;
    inquiryId: string | null;
    notes: string;
  }>({
    visible: false,
    inquiryId: null,
    notes: ''
  });
  
  const [deleteConfirm, setDeleteConfirm] = useState<{
    visible: boolean;
    inquiryId: string | null;
  }>({
    visible: false,
    inquiryId: null
  });

  useEffect(() => {
    setIsHydrated(true);
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await quickAPI.getAll();
      if (response.data.success) {
        setInquiries(response.data.inquiries);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch quick inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkContacted = (inquiryId: string, currentNotes: string) => {
    setNotesModal({
      visible: true,
      inquiryId,
      notes: currentNotes
    });
  };

  const handleSaveNotes = async () => {
    if (!notesModal.inquiryId) return;

    try {
      const response = await quickAPI.updateStatus(
        notesModal.inquiryId,
        'contacted',
        notesModal.notes
      );
      if (response.data.success) {
        setInquiries(inquiries.map(i =>
          i._id === notesModal.inquiryId
            ? { ...i, status: 'contacted', notes: notesModal.notes }
            : i
        ));
        setNotesModal({ visible: false, inquiryId: null, notes: '' });
      }
    } catch (err) {
      console.error('Failed to update inquiry:', err);
    }
  };

  const handleMarkResolved = async (id: string) => {
    try {
      const inquiry = inquiries.find(i => i._id === id);
      const response = await quickAPI.updateStatus(
        id,
        'resolved',
        inquiry?.notes || ''
      );
      if (response.data.success) {
        setInquiries(inquiries.map(i =>
          i._id === id ? { ...i, status: 'resolved' } : i
        ));
      }
    } catch (err) {
      console.error('Failed to update inquiry:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await quickAPI.delete(id);
      if (response.data.success) {
        setInquiries(inquiries.filter(i => i._id !== id));
        setDeleteConfirm({ visible: false, inquiryId: null });
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
      setDeleteConfirm({ visible: false, inquiryId: null });
    }
  };

  const stats = {
    total: inquiries?.length || 0,
    new: inquiries?.filter(i => i.status === 'new').length || 0,
    contacted: inquiries?.filter(i => i.status === 'contacted').length || 0,
    resolved: inquiries?.filter(i => i.status === 'resolved').length || 0,
  };

  const getStatusBadge = (status: string) => {
    const badgeConfig = {
      new: 'bg-red-100 text-red-700',
      contacted: 'bg-yellow-100 text-yellow-700',
      resolved: 'bg-green-100 text-green-700'
    };
    return badgeConfig[status as keyof typeof badgeConfig] || '';
  };

  if (!isHydrated) {
    return (
      <div className="space-y-8">
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent" />
          <p className="text-gray-600 mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Quick Loan Inquiries</h2>
          <p className="text-gray-600 mt-2">Hero form submissions from potential customers</p>
        </div>
        <button
          onClick={fetchInquiries}
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
            <p className="text-gray-600">Loading inquiries...</p>
          </div>
        ) : (inquiries?.length || 0) === 0 ? (
          <div className="p-8 text-center">
            <Zap size={40} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">No quick inquiries yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Mobile Number</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Loan Type</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Notes</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Created Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(inquiries || []).map((inquiry) => (
                  <tr key={inquiry._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-medium">{inquiry.mobileNumber}</td>
                    <td className="px-6 py-4 text-gray-600">{inquiry.loanType}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={inquiry.notes}>
                      {inquiry.notes || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(inquiry.status)}`}>
                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {inquiry.status === 'new' ? (
                        <button
                          onClick={() => handleMarkContacted(inquiry._id, inquiry.notes)}
                          className="px-3 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors"
                        >
                          Mark Contacted
                        </button>
                      ) : inquiry.status === 'contacted' ? (
                        <button
                          onClick={() => handleMarkResolved(inquiry._id)}
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
                        onClick={() => setDeleteConfirm({ visible: true, inquiryId: inquiry._id })}
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
                onClick={() => setNotesModal({ visible: false, inquiryId: null, notes: '' })}
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
                placeholder="Add your notes here... (e.g., customer called, interested in home loan, follow up next week)"
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setNotesModal({ visible: false, inquiryId: null, notes: '' })}
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

      {/* Delete Confirmation Dialog */}
      {deleteConfirm.visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Delete Inquiry</h3>
            </div>
            <p className="text-gray-600">
              Are you sure you want to delete this inquiry? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setDeleteConfirm({ visible: false, inquiryId: null })}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteConfirm.inquiryId && handleDelete(deleteConfirm.inquiryId)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
