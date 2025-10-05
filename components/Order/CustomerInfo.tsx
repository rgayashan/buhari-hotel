'use client';

import React from 'react';
import { Input } from '@/components/UI/Input';
import styles from './CustomerInfo.module.css';

interface CustomerInfoProps {
  tableNumber: string;
  customerName: string;
  onTableNumberChange: (value: string) => void;
  onCustomerNameChange: (value: string) => void;
}

/**
 * Customer information form component
 */
export const CustomerInfo: React.FC<CustomerInfoProps> = ({
  tableNumber,
  customerName,
  onTableNumberChange,
  onCustomerNameChange,
}) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Customer Information</h2>
      <div className={styles.grid}>
        <Input
          label="Table Number"
          required
          value={tableNumber}
          onChange={(e) => onTableNumberChange(e.target.value)}
          placeholder="e.g., T-12"
        />
        <Input
          label="Customer Name (Optional)"
          value={customerName}
          onChange={(e) => onCustomerNameChange(e.target.value)}
          placeholder="Customer name"
        />
      </div>
    </section>
  );
};
