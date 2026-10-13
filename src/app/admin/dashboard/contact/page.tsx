'use client';

import { Mail, Phone, MapPin, Trash2, Eye } from 'lucide-react';

const ContactMessage = ({ name, email, phone, subject, message, date }: any) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{subject}</p>
      </div>
      <div className="flex gap-2">
        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600">
          <Eye size={18} />
        </button>
        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600">
          <Trash2 size={18} />
        </button>
      </div>
    </div>

    <div className="space-y-2 mb-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Mail size={16} />
        <span>{email}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Phone size={16} />
        <span>{phone}</span>
      </div>
    </div>

    <p className="text-gray-700 text-sm leading-relaxed mb-4">{message}</p>

    <div className="text-xs text-gray-500">{date}</div>
  </div>
);

export default function ContactDashboard() {
  const contacts = [
    {
      name: 'Amit Singh',
      email: 'amit.singh@example.com',
      phone: '+91 98765 43210',
      subject: 'Home Loan Inquiry',
      message:
        'I am interested in applying for a home loan. Can you provide information about the current interest rates and documentation requirements?',
      date: '2 hours ago',
    },
    {
      name: 'Neha Patel',
      email: 'neha.patel@example.com',
      phone: '+91 87654 32109',
      subject: 'Personal Loan Query',
      message:
        'I need a personal loan for emergency expenses. What is the approval timeline?',
      date: '5 hours ago',
    },
    {
      name: 'Rohit Kumar',
      email: 'rohit.kumar@example.com',
      phone: '+91 76543 21098',
      subject: 'Business Loan Discussion',
      message:
        'Looking for business loan to expand my operations. Please contact me with details.',
      date: '1 day ago',
    },
    {
      name: 'Priya Verma',
      email: 'priya.verma@example.com',
      phone: '+91 65432 10987',
      subject: 'Vehicle Loan Information',
      message:
        'Interested in vehicle loan for my new car purchase. What documents do I need?',
      date: '2 days ago',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Contact Messages</h2>
        <p className="text-gray-600 mt-2">Manage and respond to customer inquiries</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Messages</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">128</p>
            </div>
            <Mail size={28} className="text-blue-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Unread</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
            </div>
            <Mail size={28} className="text-orange-600 opacity-20" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Resolved</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">104</p>
            </div>
            <Mail size={28} className="text-green-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 gap-6">
        {contacts.map((contact, i) => (
          <ContactMessage key={i} {...contact} />
        ))}
      </div>
    </div>
  );
}
