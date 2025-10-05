"use client";

import React, { useEffect } from 'react';

export type Theme = {
  brandPrimary: string;
  brandSecondary: string;
  textColor: string;
  surfaceBg: string;
  backgroundGradient: string;
  backgroundImage?: string; // path under /public
  backgroundImageOpacity?: number; // 0..1
};

type ThemeProviderProps = {
  theme: Theme;
  children: React.ReactNode;
};

/**
 * ThemeProvider component
 * Sets global CSS variables for branding and design
 * Takes a theme object as a prop
 * Children will be wrapped in a div with the applied theme
 * @param {ThemeProviderProps} props - theme object and children
 * @returns {JSX.Element} - a div with the applied theme
 */

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', theme.brandPrimary);
    root.style.setProperty('--brand-secondary', theme.brandSecondary);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--surface-bg', theme.surfaceBg);
    root.style.setProperty('--background-gradient', theme.backgroundGradient);
    if (theme.backgroundImage) {
      root.style.setProperty('--background-image', `url(${theme.backgroundImage})`);
    } else {
      root.style.removeProperty('--background-image');
    }
    if (typeof theme.backgroundImageOpacity === 'number') {
      root.style.setProperty('--background-image-opacity', String(theme.backgroundImageOpacity));
    } else {
      root.style.removeProperty('--background-image-opacity');
    }
  }, [theme]);

  return <>{children}</>;
}


