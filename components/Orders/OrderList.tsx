'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { Order } from '@/types';
import { OrderCard } from './OrderCard';
import styles from './OrderList.module.css';

interface OrderListProps {
  orders: Order[];
}

/**
 * List of all orders component
 * Displays orders in reverse chronological order
 */
export const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className={styles.empty}>
        <FileText size={64} className={styles.emptyIcon} />
        <p className={styles.emptyText}>No orders yet</p>
        <p className={styles.emptySubtext}>
          Orders will appear here once you start taking them
        </p>
      </div>
    );
  }

  // Display orders in reverse chronological order (newest first)
  const sortedOrders = [...orders].reverse();

  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        <p className={styles.statsText}>
          Showing <strong>{orders.length}</strong> {orders.length === 1 ? 'order' : 'orders'}
        </p>
      </div>
      <div className={styles.list}>
        {sortedOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};
