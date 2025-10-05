"use client";

import React, { useEffect, useState } from 'react';
import { isLoggedIn } from '@/utils/auth';
import { usePathname, useRouter } from 'next/navigation';

type AuthGuardProps = {
  children: React.ReactNode;
};

/**
 * AuthGuard is a higher-order component that wraps a component
 * and checks if the user is logged in before rendering it.
 * If the user is not logged in, it redirects the user to the login page.
 * @param {React.ReactNode} children - The component to be wrapped.
 * @returns {React.ReactElement | null} The wrapped component or null if the user is not logged in.
 */

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Allow free access to the login page
    if (pathname === '/login') {
      setReady(true);
      return;
    }

    if (!isLoggedIn()) {
      router.replace('/login');
      return;
    }
    setReady(true);
  }, [pathname, router]);

  if (!ready) return null;
  return <>{children}</>;
}


