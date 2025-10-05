'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import styles from './Toast.module.css';

type ToastProps = {
  open: boolean;
  onClose: () => void;
  message: string;
  duration?: number;
  variant?: 'success' | 'error' | 'info';
};

/**
 * A Toast component for displaying a notification message with a variant and a duration.
 *
 * @param {boolean} open - Whether the toast is open or not.
 * @param {() => void} onClose - A callback function to be called when the toast is closed.
 * @param {string} message - The message to be displayed in the toast.
 * @param {number} [duration=2400] - The duration of the toast in milliseconds.
 * @param {'success'|'error'|'info'} [variant='success'] - The variant of the toast.
 */

export const Toast: React.FC<ToastProps> = ({
  open,
  onClose,
  message,
  duration = 2400,
  variant = 'success',
}) => {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, onClose, duration]);

  if (!open) return null;

  return (
    <div className={styles.container} role="status" aria-live="polite">
      <div className={`${styles.toast} ${styles[variant]}`}>
        <div className={styles.media}>
          <div className={styles.logoWrap}>
            <Image src="/images/logo.jpg" alt="Buhari Hotel" width={40} height={40} className={styles.logoImg} />
          </div>
          <CheckCircle size={22} className={styles.icon} aria-hidden="true" />
        </div>
        <div className={styles.content}>{message}</div>
        <button className={styles.close} aria-label="Close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};


