'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, LogOut } from 'lucide-react';
import styles from './Header.module.css';
import { isLoggedIn, logout } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { ConfirmDialog } from '@/components/UI/ConfirmDialog';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

/**
 * Header component with branding and cart button
 */
export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'buhari_hotel_auth') {
        setLoggedIn(isLoggedIn());
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    router.replace('/login');
  };

  const requestLogout = () => setConfirmOpen(true);
  const cancelLogout = () => setConfirmOpen(false);
  const confirmLogout = () => {
    setConfirmOpen(false);
    handleLogout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.branding}>
            <div className={styles.brandRow}>
              <Image src="/images/logo.jpg" alt="Buhari Hotel" width={36} height={36} className={styles.logoImg} />
              <h1 className={styles.title}>Buhari Hotel</h1>
            </div>
            <p className={styles.subtitle}>Waiter Ordering System</p>
          </div>
          <div className={styles.actions}>
            <button
              onClick={onCartClick}
              className={styles.cartButton}
              aria-label="View cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </button>
            {loggedIn && (
              <button
                onClick={requestLogout}
                className={styles.logoutButton}
                aria-label="Logout"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="Sign out?"
        description="You will need to sign in again to continue."
        confirmText="Sign out"
        cancelText="Cancel"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </header>
  );
};
