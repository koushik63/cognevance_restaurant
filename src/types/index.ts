export type MenuCategory =
  | 'Starters'
  | 'Main Course'
  | 'Indian Specials'
  | 'Italian'
  | 'Desserts'
  | 'Beverages';

export type DietaryType = 'veg' | 'non-veg';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number; // in INR
  category: MenuCategory;
  dietary: DietaryType;
  image: string;
  popular?: boolean;
  chefNote?: string;
  prepTime?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'online-demo';

export interface OrderFormData {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  paymentMethod: PaymentMethod;
}

export interface ConfirmedOrder {
  referenceId: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  customer: OrderFormData;
  createdAt: string;
}

export interface ReservationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  quote: string;
  rating: number;
}

export interface SpecialOffer {
  id: string;
  badge: string;
  title: string;
  description: string;
  code: string;
  validNote: string;
}
