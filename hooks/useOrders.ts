'use client';

import { useState, useEffect } from 'react';
import { Order, CurrentOrder, MenuItem } from '@/types';
import { loadOrders, saveOrders } from '@/utils/storage';
import { generateDemoOrders } from '@/lib/data';
import { calculateOrderTotal } from '@/utils/calculations';

/**
 * Custom hook for managing orders
 * Handles order state, storage, and CRUD operations
 */
export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<CurrentOrder>({
    mainDish: null,
    sideDishes: [],
    desserts: [],
    tableNumber: '',
    customerName: '',
  });

  // Load orders from localStorage on mount, seed demo if empty
  useEffect(() => {
    const savedOrders = loadOrders();
    if (savedOrders.length > 0) {
      setOrders(savedOrders);
      return;
    }
    const demo = generateDemoOrders(14);
    setOrders(demo);
    saveOrders(demo);
  }, []);

  /**
   * Add a new order to the system
   * Validates required fields before submission
   * @returns Object with success status and message
   */
  const addOrder = (): { success: boolean; message: string } => {
    // Validation: Check if main dish is selected
    if (!currentOrder.mainDish) {
      return { success: false, message: 'Please select a main dish!' };
    }
    
    // Validation: At least one side dish is required
    if (currentOrder.sideDishes.length === 0) {
      return { success: false, message: 'Please add at least one side dish!' };
    }
    
    // Validation: Check if table number is provided
    if (!currentOrder.tableNumber.trim()) {
      return { success: false, message: 'Please enter table number!' };
    }

    // Create new order object
    const newOrder: Order = {
      id: Date.now(), // Use timestamp as unique ID
      mainDish: currentOrder.mainDish,
      sideDishes: [...currentOrder.sideDishes],
      desserts: [...currentOrder.desserts],
      tableNumber: currentOrder.tableNumber.trim(),
      customerName: currentOrder.customerName.trim(),
      total: calculateOrderTotal(currentOrder),
      timestamp: new Date().toISOString(),
      status: 'pending',
    };

    // Update orders state and persist to localStorage
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    saveOrders(updatedOrders);

    // Reset current order to initial state
    resetCurrentOrder();

    return { success: true, message: 'Order placed successfully!' };
  };

  /**
   * Update current order with partial data
   * @param updates - Partial order updates to apply
   */
  const updateCurrentOrder = (updates: Partial<CurrentOrder>): void => {
    setCurrentOrder((prev) => ({ ...prev, ...updates }));
  };

  /**
   * Reset current order to initial empty state
   */
  const resetCurrentOrder = (): void => {
    setCurrentOrder({
      mainDish: null,
      sideDishes: [],
      desserts: [],
      tableNumber: '',
      customerName: '',
    });
  };

  /**
   * Toggle main dish selection
   * @param dish - Main dish to select
   */
  const selectMainDish = (dish: MenuItem): void => {
    setCurrentOrder((prev) => ({ ...prev, mainDish: dish }));
  };

  /**
   * Toggle side dish selection
   * @param dish - Side dish to toggle
   */
  const toggleSideDish = (dish: MenuItem): void => {
    setCurrentOrder((prev) => {
      const exists = prev.sideDishes.find((d) => d.id === dish.id);
      const newSideDishes = exists
        ? prev.sideDishes.filter((d) => d.id !== dish.id)
        : [...prev.sideDishes, dish];
      
      return { ...prev, sideDishes: newSideDishes };
    });
  };

  /**
   * Toggle dessert selection
   * @param dessert - Dessert to toggle
   */
  const toggleDessert = (dessert: MenuItem): void => {
    setCurrentOrder((prev) => {
      const exists = prev.desserts.find((d) => d.id === dessert.id);
      const newDesserts = exists
        ? prev.desserts.filter((d) => d.id !== dessert.id)
        : [...prev.desserts, dessert];
      
      return { ...prev, desserts: newDesserts };
    });
  };

  /**
   * Delete an order by ID
   * @param orderId - ID of order to delete
   */
  const deleteOrder = (orderId: number): void => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    saveOrders(updatedOrders);
  };

  /**
   * Update order status
   * @param orderId - ID of order to update
   * @param status - New status value
   */
  const updateOrderStatus = (
    orderId: number,
    status: 'pending' | 'completed' | 'cancelled'
  ): void => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    saveOrders(updatedOrders);
  };

  return {
    orders,
    currentOrder,
    addOrder,
    updateCurrentOrder,
    resetCurrentOrder,
    selectMainDish,
    toggleSideDish,
    toggleDessert,
    deleteOrder,
    updateOrderStatus,
  };
};
