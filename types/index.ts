export interface MenuItem {
    id: number;
    name: string;
    price: number;
  }
  
  export interface Order {
    id: number;
    mainDish: MenuItem;
    sideDishes: MenuItem[];
    desserts: MenuItem[];
    tableNumber: string;
    customerName: string;
    total: number;
    timestamp: string;
    status: 'pending' | 'completed' | 'cancelled';
  }
  
  export interface CurrentOrder {
    mainDish: MenuItem | null;
    sideDishes: MenuItem[];
    desserts: MenuItem[];
    tableNumber: string;
    customerName: string;
  }
  
  export type TabType = 'order' | 'orders' | 'reports';
  