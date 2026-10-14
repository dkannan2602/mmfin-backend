'use client';

import { BarChart3, Users, Home, TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, change }: any) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {change && (
          <p className="text-green-600 text-sm mt-2">↑ {change}% from last month</p>
        )}
      </div>
      <div className="p-4 bg-blue-50 rounded-lg">
        <Icon size={28} className="text-blue-600" />
      </div>
    </div>
  </div>
);

export default function GeneralDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">General Dashboard</h2>
        <p className="text-gray-600 mt-2">Welcome to RealFinance Admin Dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Home}
          title="Total Loans"
          value="1,247"
          change="12"
        />
        <StatCard
          icon={Users}
          title="Active Users"
          value="842"
          change="8"
        />
        <StatCard
          icon={TrendingUp}
          title="Monthly Applications"
          value="356"
          change="24"
        />
        <StatCard
          icon={BarChart3}
          title="Revenue"
          value="₹24.5L"
          change="15"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loan Applications Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Loan Applications</h3>
          <div className="h-64 flex items-end gap-4 px-4">
            {[30, 45, 60, 48, 72, 55, 65].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-blue-600 rounded-t-lg transition-all hover:bg-blue-700"
                style={{ height: `${(height / 100) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-4 px-4">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Loan Types Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Loan Types Distribution</h3>
          <div className="space-y-4">
            {[
              { label: 'Home Loan', percentage: 40, color: 'bg-blue-600' },
              { label: 'Personal Loan', percentage: 25, color: 'bg-purple-600' },
              { label: 'Business Loan', percentage: 20, color: 'bg-green-600' },
              { label: 'Vehicle Loan', percentage: 10, color: 'bg-orange-600' },
              { label: 'Loan Against Property', percentage: 5, color: 'bg-pink-600' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  <span className="text-sm text-gray-600">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Loan Applications</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Applicant</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Loan Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'John Doe', type: 'Home Loan', amount: '₹25,00,000', status: 'Approved' },
                { name: 'Jane Smith', type: 'Personal Loan', amount: '₹5,00,000', status: 'Pending' },
                { name: 'Raj Kumar', type: 'Business Loan', amount: '₹50,00,000', status: 'In Review' },
                { name: 'Priya Sharma', type: 'Vehicle Loan', amount: '₹8,50,000', status: 'Approved' },
              ].map((item, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{item.name}</td>
                  <td className="py-3 px-4 text-gray-600">{item.type}</td>
                  <td className="py-3 px-4 text-gray-900 font-medium">{item.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">2 days ago</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
