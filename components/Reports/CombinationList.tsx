'use client';

import React from 'react';
import { Award } from 'lucide-react';
import styles from './CombinationList.module.css';

interface CombinationListProps {
  combinations: [string, number][];
}

/**
 * List of popular dish combinations component
 * Displays top combinations with ranking
 */
export const CombinationList: React.FC<CombinationListProps> = ({
  combinations,
}) => {
  if (combinations.length === 0) {
    return (
      <div className={styles.empty}>
        <Award size={48} className={styles.emptyIcon} />
        <p className={styles.emptyText}>No combination data available yet</p>
        <p className={styles.emptySubtext}>
          Start taking orders to see popular dish combinations
        </p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {combinations.map(([combo, count], index) => (
        <div key={combo} className={styles.item}>
          <div className={styles.itemContent}>
            <div className={`${styles.rank} ${index < 3 ? styles.topRank : ''}`}>
              {index + 1}
            </div>
            <span className={styles.combo}>{combo}</span>
          </div>
          <div className={styles.count}>
            <span className={styles.countNumber}>{count}</span>
            <span className={styles.countLabel}>orders</span>
          </div>
        </div>
      ))}
    </div>
  );
};
