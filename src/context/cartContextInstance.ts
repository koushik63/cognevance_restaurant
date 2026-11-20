import { createContext } from 'react';
import type { CartItem, MenuItem } from '../types';

export interface CartContextValue {
  items: CartItem[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (item: MenuItem, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  freeDeliveryRemaining: number;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);
