import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import { SplashProvider } from '../components/UI/SplashProvider';
import { AuthGuard } from '../components/UI/AuthGuard';
import { ThemeProvider, type Theme } from '../components/UI/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Buhari Hotel - Waiter Ordering System',
  description: 'Professional ordering system for Buhari Hotel waiters',
  keywords: ['restaurant', 'ordering', 'hotel', 'waiter', 'management'],
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
    shortcut: '/images/logo.jpg',
  },
};

/**
 * Root layout component
 * Wraps all pages with common HTML structure
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hotelTheme: Theme = {
    brandPrimary: '#b91c1c',
    brandSecondary: '#ea580c',
    textColor: '#111827',
    surfaceBg: '#ffffff',
    backgroundGradient: 'linear-gradient(120deg, #fff7ed, #ffe4e6)',
    backgroundImage: '/images/foodImage1.jpg',
    backgroundImageOpacity: 2.08,
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={hotelTheme}>
          <SplashProvider>
            <AuthGuard>
              {children}
            </AuthGuard>
          </SplashProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
