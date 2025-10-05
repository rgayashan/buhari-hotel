'use client';

import React from 'react';
import { CurrentOrder } from '@/types';
import { calculateOrderTotal } from '@/utils/calculations';
import { Button } from '@/components/UI/Button';
import styles from './OrderSummary.module.css';

interface OrderSummaryProps {
  order: CurrentOrder;
  onSubmit: () => void;
}

/**
 * Order summary and submission component
 */
export const OrderSummary: React.FC<OrderSummaryProps> = ({
  order,
  onSubmit,
}) => {
  const hasItems =
    order.mainDish ||
    order.sideDishes.length > 0 ||
    order.desserts.length > 0;

  if (!hasItems) return null;

  const total = calculateOrderTotal(order);
  const canSubmit = !!order.mainDish && order.sideDishes.length > 0 && !!order.tableNumber.trim();

  return (
    <section className={styles.summary}>
      <h3 className={styles.heading}>Order Summary</h3>
      <div className={styles.items}>
        {order.mainDish && (
          <div className={styles.item}>
            <span className={styles.itemName}>{order.mainDish.name}</span>
            <span className={styles.itemPrice}>Rs. {order.mainDish.price}</span>
          </div>
        )}
        {order.sideDishes.map((dish) => (
          <div key={dish.id} className={styles.item}>
            <span className={styles.itemName}>{dish.name}</span>
            <span className={styles.itemPrice}>Rs. {dish.price}</span>
          </div>
        ))}
        {order.desserts.map((dessert) => (
          <div key={dessert.id} className={styles.item}>
            <span className={styles.itemName}>{dessert.name}</span>
            <span className={styles.itemPrice}>Rs. {dessert.price}</span>
          </div>
        ))}
        <div className={styles.total}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalAmount}>Rs. {total}</span>
        </div>
      </div>
      <Button fullWidth onClick={onSubmit} variant="highlight" disabled={!canSubmit} aria-disabled={!canSubmit}>
        Place Order
      </Button>
    </section>
  );
};
