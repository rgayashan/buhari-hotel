'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { DEMO_CREDENTIALS, login } from '@/utils/auth';
import { useRouter } from 'next/navigation';

/**
 * LoginPage component
 *
 * @returns {JSX.Element} A JSX element representing the login page
 */

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = login({ username, password });
    setLoading(false);
    if (result.success) {
      router.replace('/');
    } else {
      setError(result.message);
    }
  };

  const fillDemo = () => {
    setUsername(DEMO_CREDENTIALS.username);
    setPassword(DEMO_CREDENTIALS.password);
  };

  return (
    <div className={styles.page}>
      <div className={styles.center}>
        <div className={styles.card}>
          <div className={styles.brand}>
            <Image src="/images/logo.jpg" alt="Buhari Hotel" width={36} height={36} className={styles.logoImg} />
            <div className={styles.title}>Buhari Hotel</div>
          </div>
          <div className={styles.subtitle}>Waiter Ordering System</div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="username">Email</label>
              <input
                id="username"
                className={styles.input}
                type="email"
                placeholder="you@example.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">Password</label>
              <input
                id="password"
                className={styles.input}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div role="alert" style={{ color: '#dc2626', fontSize: 13 }}>{error}</div>
            )}

            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <div className={styles.demo}>
            Demo credentials:
            <div className={styles.demoCode} style={{ marginTop: 8 }}>
              {DEMO_CREDENTIALS.username} / {DEMO_CREDENTIALS.password}
            </div>
            <div>
              <button onClick={fillDemo} style={{ marginTop: 10, background: 'transparent', border: 'none', color: '#2563eb', cursor: 'pointer' }}>Fill demo</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>© {new Date().getFullYear()} Buhari Hotel</div>
    </div>
  );
}


