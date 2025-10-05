export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: 'main' | 'side' | 'dessert';
}

export interface OrderItem {
  item: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: number;
  mainDish: MenuItem;
  sideDishes: OrderItem[];
  desserts: OrderItem[];
  total: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface DailySales {
  date: string;
  revenue: number;
  orderCount: number;
}

export interface PopularItem {
  item: MenuItem;
  orderCount: number;
  revenue: number;
}