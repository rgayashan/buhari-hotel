'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color: 'green' | 'blue' | 'purple' | 'orange';
}

/**
 * Statistics card component for reports dashboard
 * Displays key metrics with icon and color coding
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}) => {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.iconWrapper}>
          <Icon size={32} strokeWidth={2} />
        </div>
      </div>
      <div className={styles.value}>{value}</div>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
};
