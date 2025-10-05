'use client';

import React from 'react';
import { TrendingUp, FileText, Award } from 'lucide-react';
import { Order } from '@/types';
import {
  calculateDailyRevenue,
  getMostPopularMainDish,
  getMostPopularSideDish,
  getDishCombinations,
} from '@/utils/calculations';
import { StatCard } from './StatCard';
import { CombinationList } from './CombinationList';
import styles from './ReportDashboard.module.css';

interface ReportDashboardProps {
  orders: Order[];
}

/**
 * Reports dashboard component
 * Displays statistics and analytics for the restaurant
 */
export const ReportDashboard: React.FC<ReportDashboardProps> = ({ orders }) => {
  const dailyRevenue = calculateDailyRevenue(orders);
  const mostPopularMain = getMostPopularMainDish(orders);
  const mostPopularSide = getMostPopularSideDish(orders);
  const combinations = getDishCombinations(orders, 5);

  return (
    <div className={styles.dashboard}>
      {/* Statistics Cards Grid */}
      <section className={styles.statsGrid} aria-label="Key statistics">
        <StatCard
          title="Daily Revenue"
          value={`Rs. ${dailyRevenue}`}
          subtitle="Today's total sales"
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Total Orders"
          value={orders.length}
          subtitle="All time orders"
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Top Main Dish"
          value={mostPopularMain?.name || 'N/A'}
          subtitle={`${mostPopularMain?.count || 0} orders`}
          icon={Award}
          color="purple"
        />
        <StatCard
          title="Top Side Dish"
          value={mostPopularSide?.name || 'N/A'}
          subtitle={`${mostPopularSide?.count || 0} orders`}
          icon={Award}
          color="orange"
        />
      </section>

      {/* Combinations Section */}
      <section className={styles.combinationsSection} aria-label="Popular combinations">
        <div className={styles.combinationsHeader}>
          <h3 className={styles.sectionHeading}>Popular Dish Combinations</h3>
          <p className={styles.sectionSubheading}>
            Top 5 most ordered combinations of main and side dishes
          </p>
        </div>
        <CombinationList combinations={combinations} />
      </section>
    </div>
  );
};
