import { MenuItem } from '@/types';

export const MENU_DATA = {
  mainDishes: [
    { id: 1, name: 'Rice', price: 100 },
    { id: 2, name: 'Rotty', price: 20 },
    { id: 3, name: 'Noodles', price: 150 },
  ] as MenuItem[],
  sideDishes: [
    { id: 1, name: 'Wadai', price: 45 },
    { id: 2, name: 'Dhal curry', price: 75 },
    { id: 3, name: 'Fish curry', price: 120 },
  ] as MenuItem[],
  desserts: [
    { id: 1, name: 'Watalappam', price: 40 },
    { id: 2, name: 'Jelly', price: 20 },
    { id: 3, name: 'Pudding', price: 25 },
  ] as MenuItem[],
};