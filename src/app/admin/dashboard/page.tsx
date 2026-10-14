'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to general dashboard on mount
    router.push('/admin/dashboard/general');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Loading...</h1>
        <p className="text-gray-600 mt-2">Redirecting to dashboard</p>
      </div>
    </div>
  );
}
