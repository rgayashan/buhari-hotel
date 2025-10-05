'use client';

import React, { useState } from 'react';
import { Users, FileText, BarChart3 } from 'lucide-react';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import { CustomerInfo } from '@/components/Order/CustomerInfo';
import { MenuSection } from '@/components/Order/MenuSection';
import { OrderSummary } from '@/components/Order/OrderSummary';
import { OrderList } from '@/components/Orders/OrderList';
import { ReportDashboard } from '@/components/Reports/ReportDashboard';
import { useOrders } from '@/hooks/useOrders';
import { MENU_DATA } from '@/constants/menu';
import { TabType, MenuItem } from '@/types';
import styles from './page.module.css';
import { Toast } from '@/components/UI/Toast';

/**
 * Main application page component
 * Handles order taking, viewing orders, and reports
 */
export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('order');
  const [toastOpen, setToastOpen] = useState(false);
  const {
    orders,
    currentOrder,
    addOrder,
    updateCurrentOrder,
    selectMainDish,
    toggleSideDish,
    toggleDessert,
  } = useOrders();

  // Calculate cart count for header badge
  const cartCount =
    (currentOrder.mainDish ? 1 : 0) +
    currentOrder.sideDishes.length +
    currentOrder.desserts.length;

  /**
   * Handle main dish selection
   * @param dish - Main dish item to select
   */
  const handleMainDishSelect = (dish: MenuItem): void => {
    selectMainDish(dish);
  };

  /**
   * Handle side dish toggle (add/remove)
   * @param dish - Side dish item to toggle
   */
  const handleSideDishToggle = (dish: MenuItem): void => {
    toggleSideDish(dish);
  };

  /**
   * Handle dessert toggle (add/remove)
   * @param dessert - Dessert item to toggle
   */
  const handleDessertToggle = (dessert: MenuItem): void => {
    toggleDessert(dessert);
  };

  /**
   * Handle order submission
   * Displays success/error message via alert
   */
  const handleOrderSubmit = (): void => {
    const result = addOrder();
    if (result.success) {
      setToastOpen(true);
    } else {
      alert(result.message);
    }
    
    // If successful, scroll to top
    if (result.success) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Handle cart button click
   * Scrolls to top of page to view order summary
   */
  const handleCartClick = (): void => {
    setActiveTab('order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handle tab change
   * @param tab - New active tab
   */
  const handleTabChange = (tab: TabType): void => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.app}>
      {/* Header Section */}
      <Header cartCount={cartCount} onCartClick={handleCartClick} />

      {/* Navigation Tabs */}
      <nav className={styles.nav} role="navigation" aria-label="Main navigation">
        <div className={styles.navContainer}>
          <div className={styles.tabList} role="tablist">
            <button
              onClick={() => handleTabChange('order')}
              className={`${styles.tab} ${
                activeTab === 'order' ? styles.activeTab : styles.inactiveTab
              }`}
              role="tab"
              aria-selected={activeTab === 'order'}
              aria-controls="order-panel"
            >
              <Users size={18} aria-hidden="true" />
              <span className={styles.tabText}>Take Order</span>
            </button>
            <button
              onClick={() => handleTabChange('orders')}
              className={`${styles.tab} ${
                activeTab === 'orders' ? styles.activeTab : styles.inactiveTab
              }`}
              role="tab"
              aria-selected={activeTab === 'orders'}
              aria-controls="orders-panel"
            >
              <FileText size={18} aria-hidden="true" />
              <span className={styles.tabText}>All Orders</span>
            </button>
            <button
              onClick={() => handleTabChange('reports')}
              className={`${styles.tab} ${
                activeTab === 'reports' ? styles.activeTab : styles.inactiveTab
              }`}
              role="tab"
              aria-selected={activeTab === 'reports'}
              aria-controls="reports-panel"
            >
              <BarChart3 size={18} aria-hidden="true" />
              <span className={styles.tabText}>Reports</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={styles.main}>
        {/* Order Taking Tab Panel */}
        {activeTab === 'order' && (
          <div
            id="order-panel"
            role="tabpanel"
            aria-labelledby="order-tab"
            className={styles.orderSection}
          >
            {/* Customer Information Form */}
            <CustomerInfo
              tableNumber={currentOrder.tableNumber}
              customerName={currentOrder.customerName}
              onTableNumberChange={(value) =>
                updateCurrentOrder({ tableNumber: value })
              }
              onCustomerNameChange={(value) =>
                updateCurrentOrder({ customerName: value })
              }
            />

            {/* Main Dishes Selection */}
            <MenuSection
              title="Main Dishes"
              items={MENU_DATA.mainDishes}
              selectedItems={currentOrder.mainDish}
              onItemToggle={handleMainDishSelect}
              required
              color="red"
            />

            {/* Side Dishes Selection */}
            <MenuSection
              title="Side Dishes"
              items={MENU_DATA.sideDishes}
              selectedItems={currentOrder.sideDishes}
              onItemToggle={handleSideDishToggle}
              multiSelect
              required
              disabled={!currentOrder.mainDish}
              color="orange"
            />

            {/* Desserts Selection */}
            <MenuSection
              title="Desserts"
              items={MENU_DATA.desserts}
              selectedItems={currentOrder.desserts}
              onItemToggle={handleDessertToggle}
              multiSelect
              disabled={!currentOrder.mainDish}
              color="yellow"
            />

            {/* Order Summary and Submit */}
            <OrderSummary order={currentOrder} onSubmit={handleOrderSubmit} />
          </div>
        )}

        {/* All Orders Tab Panel */}
        {activeTab === 'orders' && (
          <div
            id="orders-panel"
            role="tabpanel"
            aria-labelledby="orders-tab"
            className={styles.tabPanel}
          >
            <h2 className={styles.pageHeading}>All Orders</h2>
            <OrderList orders={orders} />
          </div>
        )}

        {/* Reports Tab Panel */}
        {activeTab === 'reports' && (
          <div
            id="reports-panel"
            role="tabpanel"
            aria-labelledby="reports-tab"
            className={styles.tabPanel}
          >
            <h2 className={styles.pageHeading}>Sales Reports</h2>
            <ReportDashboard orders={orders} />
          </div>
        )}
      </main>

      {/* Footer Section */}
      <Footer />

      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message="Order placed successfully!"
        variant="success"
      />
    </div>
  );
}