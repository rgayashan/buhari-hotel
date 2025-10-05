import { Order } from '@/types';

const STORAGE_KEY = 'buhari_hotel_orders';

/**
 * Load orders from browser storage
 * @returns Array of orders
 */
export const loadOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading orders:', error);
    return [];
  }
};

/**
 * Save orders to browser storage
 * @param orders - Array of orders to save
 */
export const saveOrders = (orders: Order[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving orders:', error);
  }
};