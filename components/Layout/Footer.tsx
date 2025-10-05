import React from 'react';
import styles from './Footer.module.css';

/**
 * Footer component with copyright information
 */
export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          &copy; 2025 Buhari Hotel. All rights reserved.
        </p>
        <p className={styles.version}>Waiter Ordering System v1.0</p>
      </div>
    </footer>
  );
};