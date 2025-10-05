'use client';

import React from 'react';
import { Order } from '@/types';
import styles from './OrderCard.module.css';

interface OrderCardProps {
  order: Order;
}

/**
 * Individual order card component
 * Displays order details including items, customer info, and total
 */
export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h3 className={styles.table}>Table: {order.tableNumber}</h3>
          {order.customerName && (
            <p className={styles.customer}>Customer: {order.customerName}</p>
          )}
          <p className={styles.timestamp}>
            {new Date(order.timestamp).toLocaleString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className={styles.summary}>
          <div className={styles.total}>Rs. {order.total}</div>
          <span className={`${styles.status} ${styles[order.status]}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className={styles.divider}></div>
      
      <div className={styles.details}>
        <h4 className={styles.detailsHeading}>Order Items:</h4>
        <ul className={styles.itemList}>
          <li className={styles.item}>
            <span className={styles.itemLabel}>
              <strong>Main:</strong> {order.mainDish.name}
            </span>
            <span className={styles.itemPrice}>Rs. {order.mainDish.price}</span>
          </li>
          {order.sideDishes.map((dish) => (
            <li key={`side-${dish.id}`} className={styles.item}>
              <span className={styles.itemLabel}>
                <strong>Side:</strong> {dish.name}
              </span>
              <span className={styles.itemPrice}>Rs. {dish.price}</span>
            </li>
          ))}
          {order.desserts.map((dessert) => (
            <li key={`dessert-${dessert.id}`} className={styles.item}>
              <span className={styles.itemLabel}>
                <strong>Dessert:</strong> {dessert.name}
              </span>
              <span className={styles.itemPrice}>Rs. {dessert.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};