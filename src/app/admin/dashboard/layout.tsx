'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import {
  LayoutDashboard,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const sidebarMenus = [
  {
    id: 'general',
    label: 'General',
    icon: LayoutDashboard,
    href: '/admin/dashboard/general',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
    href: '/admin/dashboard/contact',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/admin/dashboard/settings',
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    const token = Cookies.get('authToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Get admin info from cookie
    const adminInfo = Cookies.get('adminInfo');
    if (adminInfo) {
      try {
        const parsed = JSON.parse(adminInfo);
        setAdminName(parsed.name);
        setAdminEmail(parsed.email);
      } catch (error) {
        console.error('Error parsing admin info:', error);
      }
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('authToken');
    Cookies.remove('adminInfo');
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col fixed h-screen left-0 top-0 z-40`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && <h2 className="text-xl font-bold">RealFinance</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-gray-700 p-2 rounded transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-6 space-y-3">
          {sidebarMenus.map((menu) => {
            const Icon = menu.icon;
            return (
              <Link
                key={menu.id}
                href={menu.href}
                className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
              >
                <Icon size={20} className="flex-shrink-0" />
                {sidebarOpen && <span>{menu.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors text-gray-300 hover:text-white"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 flex flex-col`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{adminName || 'Admin'}</p>
              <p className="text-xs text-gray-600">{adminEmail || 'admin@example.com'}</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {(adminName || 'A').charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
