"use client";

import React from 'react';
import styles from './SplashScreen.module.css';
import Image from 'next/image';

type SplashScreenProps = {
  isVisible: boolean;
};

/**
 * SplashScreen component
 *
 * @description
 * A full-screen loading animation component
 * @param {SplashScreenProps} props - The component props
 * @param {boolean} props.isVisible - Whether the loading animation is visible
 * @returns {JSX.Element} A JSX element representing the loading animation
 */

export function SplashScreen({ isVisible }: SplashScreenProps) {
  return (
    <div
      className={styles.overlay}
      aria-hidden={!isVisible}
      style={{ opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <div className={styles.card} role="status" aria-label="Loading application">
        <div className={styles.logoWrap}>
          <Image
            src="/images/logo.jpg"
            alt="Buhari Hotel logo"
            width={80}
            height={80}
            className={styles.logoImgLarge}
            priority
          />
        </div>
        <div className={styles.brand}>Buhari Hotel</div>
        <div className={styles.subtitle}>Waiter Ordering System</div>
        <div className={styles.progress}>
          <span className={styles.bar} />
        </div>
      </div>
    </div>
  );
}


