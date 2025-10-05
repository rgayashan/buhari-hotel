"use client";

import React, { useEffect, useState } from 'react';
import { SplashScreen } from './SplashScreen';

type SplashProviderProps = {
  children: React.ReactNode;
  minDurationMs?: number;
};


/**
 * Provides a splash screen component that wraps the given children.
 * The splash screen will remain visible until the DOM has finished
 * loading (i.e. document.readyState === 'complete' or
 * 'interactive') or at least minDurationMs milliseconds have passed.
 *
 * @param {React.ReactNode} children - The children component to be wrapped
 * @param {number} [minDurationMs=1300] - The minimum duration in milliseconds
 * that the splash screen should be visible
 * @returns {JSX.Element} A JSX element representing the splash provider
 */

export function SplashProvider({ children, minDurationMs = 1300 }: SplashProviderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleReady = () => {
      // Ensure splash shows at least minDurationMs
      setTimeout(() => setIsVisible(false), minDurationMs);
    };

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      handleReady();
    } else {
      window.addEventListener('DOMContentLoaded', handleReady, { once: true });
    }

    return () => {
      window.removeEventListener('DOMContentLoaded', handleReady);
    };
  }, [minDurationMs]);

  return (
    <>
      <SplashScreen isVisible={isVisible} />
      {children}
    </>
  );
}


