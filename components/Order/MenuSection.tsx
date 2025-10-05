'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem } from '@/types';
import styles from './MenuSection.module.css';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  selectedItems: MenuItem | MenuItem[] | null;
  onItemToggle: (item: MenuItem) => void;
  multiSelect?: boolean;
  required?: boolean;
  color?: 'red' | 'orange' | 'yellow';
  disabled?: boolean;
}

/**
 * Reusable menu section component for displaying menu items
 */
export const MenuSection: React.FC<MenuSectionProps> = ({
  title,
  items,
  selectedItems,
  onItemToggle,
  multiSelect = false,
  required = false,
  color = 'red',
  disabled = false,
}) => {
  const isSelected = (item: MenuItem): boolean => {
    if (multiSelect && Array.isArray(selectedItems)) {
      return selectedItems.some((selected) => selected.id === item.id);
    }
    return selectedItems !== null && !Array.isArray(selectedItems) && selectedItems.id === item.id;
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        {title}
        {required && <span className={styles.required}> *</span>}
      </h2>
      <div className={`${styles.grid} ${disabled ? styles.disabled : ''}`} aria-disabled={disabled}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => !disabled && onItemToggle(item)}
            className={`${styles.card} ${isSelected(item) ? styles[`selected_${color}`] : styles.default}`}
            aria-pressed={isSelected(item)}
            disabled={disabled}
          >
            <div className={styles.cardContent}>
              <div className={styles.itemHeader}>
                <span className={styles.itemName}>{item.name}</span>
                {isSelected(item) && multiSelect && (
                  <Plus size={20} className={styles[`icon_${color}`]} />
                )}
              </div>
              <span className={styles[`price_${color}`]}>Rs. {item.price}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
