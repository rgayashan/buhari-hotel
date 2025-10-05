import { Order, CurrentOrder, MenuItem } from '@/types';

/**
 * Calculate total price for current order
 * @param order - Current order object
 * @returns Total price
 */
export const calculateOrderTotal = (order: CurrentOrder): number => {
  let total = 0;
  
  if (order.mainDish) {
    total += order.mainDish.price;
  }
  
  order.sideDishes.forEach((dish) => {
    total += dish.price;
  });
  
  order.desserts.forEach((dessert) => {
    total += dessert.price;
  });
  
  return total;
};

/**
 * Calculate daily revenue from orders
 * @param orders - Array of all orders
 * @returns Total revenue for today
 */
export const calculateDailyRevenue = (orders: Order[]): number => {
    const today = new Date().toDateString();
    
    return orders
      .filter((order) => new Date(order.timestamp).toDateString() === today)
      .reduce((sum, order) => sum + order.total, 0);
  };
  
  /**
   * Get most popular main dish
   * @param orders - Array of all orders
   * @returns Object with dish name and count
   */
  export const getMostPopularMainDish = (
    orders: Order[]
  ): { name: string; count: number } | null => {
    const dishCount: Record<string, number> = {};
    
    orders.forEach((order) => {
      if (order.mainDish) {
        const name = order.mainDish.name;
        dishCount[name] = (dishCount[name] || 0) + 1;
      }
    });
    
    const sorted = Object.entries(dishCount).sort((a, b) => b[1] - a[1]);
    
    return sorted.length > 0
      ? { name: sorted[0][0], count: sorted[0][1] }
      : null;
  };
  
  /**
   * Get most popular side dish
   * @param orders - Array of all orders
   * @returns Object with dish name and count
   */
  export const getMostPopularSideDish = (
    orders: Order[]
  ): { name: string; count: number } | null => {
    const dishCount: Record<string, number> = {};
    
    orders.forEach((order) => {
      order.sideDishes.forEach((dish) => {
        dishCount[dish.name] = (dishCount[dish.name] || 0) + 1;
      });
    });
    
    const sorted = Object.entries(dishCount).sort((a, b) => b[1] - a[1]);
    
    return sorted.length > 0
      ? { name: sorted[0][0], count: sorted[0][1] }
      : null;
  };
  
  /**
   * Get popular dish combinations
   * @param orders - Array of all orders
   * @param limit - Maximum number of combinations to return
   * @returns Array of combinations with counts
   */
  export const getDishCombinations = (
    orders: Order[],
    limit: number = 5
  ): [string, number][] => {
    const combinations: Record<string, number> = {};
    
    orders.forEach((order) => {
      if (order.mainDish) {
        const mainDishName = order.mainDish.name;
        
        order.sideDishes.forEach((sideDish) => {
          const key = `${mainDishName} + ${sideDish.name}`;
          combinations[key] = (combinations[key] || 0) + 1;
        });
      }
    });
    
    return Object.entries(combinations)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
  };