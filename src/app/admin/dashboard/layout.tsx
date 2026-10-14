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
  Zap,
} from 'lucide-react';

const sidebarMenus = [
  {
    id: 'general',
    label: 'General',
    icon: LayoutDashboard,
    href: '/admin/dashboard/general',
  },
  {
    id: 'quick',
    label: 'Quick',
    icon: Zap,
    href: '/admin/dashboard/quick',
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

const SESSION_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes inactivity

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [sessionMessage, setSessionMessage] = useState('');

  useEffect(() => {
    setIsHydrated(true);
    
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

    // Check session start time
    const loginTime = localStorage.getItem('loginTime');
    if (!loginTime) {
      // Set login time if not exists
      localStorage.setItem('loginTime', Date.now().toString());
    } else {
      // Check if 8 hours have passed
      const currentTime = Date.now();
      const elapsedTime = currentTime - parseInt(loginTime);
      
      if (elapsedTime >= SESSION_TIMEOUT) {
        // Session expired
        handleSessionExpired();
        return;
      }
    }

    // Setup auto-logout after 8 hours
    const sessionTimer = setTimeout(() => {
      handleSessionExpired();
    }, SESSION_TIMEOUT);

    // Setup inactivity timer (30 minutes)
    let inactivityTimer = setTimeout(() => {
      setSessionMessage('Your session will expire due to inactivity in 2 minutes. Click to continue.');
      setShowSessionModal(true);
    }, INACTIVITY_TIMEOUT);

    // Reset inactivity timer on user activity
    const handleUserActivity = () => {
      clearTimeout(inactivityTimer);
      setShowSessionModal(false);
      
      inactivityTimer = setTimeout(() => {
        setSessionMessage('Your session will expire due to inactivity in 2 minutes. Click to continue.');
        setShowSessionModal(true);
      }, INACTIVITY_TIMEOUT);
    };

    // Listen for user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });

    return () => {
      clearTimeout(sessionTimer);
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
    };
  }, [router]);

  const handleSessionExpired = () => {
    Cookies.remove('authToken');
    Cookies.remove('adminInfo');
    localStorage.removeItem('loginTime');
    setShowSessionModal(false);
    router.push('/admin/login');
  };

  const handleContinueSession = () => {
    setShowSessionModal(false);
    // Reset the login time to extend the session
    localStorage.setItem('loginTime', Date.now().toString());
  };

  const handleLogout = () => {
    Cookies.remove('authToken');
    Cookies.remove('adminInfo');
    localStorage.removeItem('loginTime');
    router.push('/admin/login');
  };

  // Prevent hydration mismatch by only rendering after client hydration
  if (!isHydrated) {
    return (
      <div className="flex h-screen bg-gray-100">
        <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800" />
        <div className="flex-1 ml-64">
          <div className="h-20 bg-white border-b border-gray-200" />
          <div className="p-8" />
        </div>
      </div>
    );
  }

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

      {/* Session Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Session Timeout</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {sessionMessage}
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-yellow-700 text-sm font-medium text-center">
                Your session will expire in 2 minutes
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSessionExpired}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
              >
                Logout Now
              </button>
              <button
                onClick={handleContinueSession}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
