import { MenuItem, Order } from '@/types';
import { MENU_DATA } from '@/constants/menu';

export const MAIN_DISHES: MenuItem[] = [
  { id: 1, name: 'Rice', price: 100 },
  { id: 2, name: 'Rotty', price: 20 },
  { id: 3, name: 'Noodles', price: 150 },
];

export const SIDE_DISHES: MenuItem[] = [
  { id: 1, name: 'Wadai', price: 45 },
  { id: 2, name: 'Dhal curry', price: 75 },
  { id: 3, name: 'Fish curry', price: 120 },
];

export const DESSERTS: MenuItem[] = [
  { id: 1, name: 'Watalappam', price: 40 },
  { id: 2, name: 'Jelly', price: 20 },
  { id: 3, name: 'Pudding', price: 25 },
];

export const ALL_ITEMS = [...MAIN_DISHES, ...SIDE_DISHES, ...DESSERTS];


/**
 * Generates an array of demo orders
 * @param {number} [count=12] The number of demo orders to generate
 * @returns {Order[]} An array of demo orders
 */

export function generateDemoOrders(count: number = 12): Order[] {
  const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const now = Date.now();

  return Array.from({ length: count }).map((_, idx) => {
    const main = MENU_DATA.mainDishes[randomBetween(0, MENU_DATA.mainDishes.length - 1)];
    const sideCount = randomBetween(0, 2);
    const dessertCount = randomBetween(0, 1);
    const sideDishes = [...MENU_DATA.sideDishes]
      .sort(() => 0.5 - Math.random())
      .slice(0, sideCount);
    const desserts = [...MENU_DATA.desserts]
      .sort(() => 0.5 - Math.random())
      .slice(0, dessertCount);

    const total = (main?.price || 0) + sideDishes.reduce((s, d) => s + d.price, 0) + desserts.reduce((s, d) => s + d.price, 0);

    const timestamp = new Date(now - randomBetween(0, 4) * 24 * 60 * 60 * 1000 - randomBetween(0, 20_000_000)).toISOString();

    return {
      id: now - idx,
      mainDish: main,
      sideDishes,
      desserts,
      tableNumber: String(randomBetween(1, 20)),
      customerName: `Guest ${randomBetween(1, 200)}`,
      total,
      timestamp,
      status: ['pending', 'completed', 'cancelled'][randomBetween(0, 2)] as Order['status'],
    };
  });
}