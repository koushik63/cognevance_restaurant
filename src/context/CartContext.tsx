import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { CartItem, MenuItem } from '../types';
import { CartContext, type CartContextValue } from './cartContextInstance';

const CART_STORAGE_KEY = 'saffron_stone_cart_v1';
const DELIVERY_FEE = 60;
const FREE_DELIVERY_THRESHOLD = 999;
const MAX_ITEM_QUANTITY = 20;

function loadInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry): entry is CartItem =>
        entry &&
        typeof entry === 'object' &&
        entry.item &&
        typeof entry.item.id === 'string' &&
        typeof entry.item.price === 'number' &&
        typeof entry.quantity === 'number' &&
        entry.quantity >= 1 &&
        entry.quantity <= MAX_ITEM_QUANTITY
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadInitialCart);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [items]);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((prev) => !prev), []);

  const addItem = useCallback((item: MenuItem, quantity = 1) => {
    const safeQty = Math.max(1, Math.min(MAX_ITEM_QUANTITY, Math.floor(quantity)));
    setItems((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        const nextQty = Math.min(MAX_ITEM_QUANTITY, existing.quantity + safeQty);
        return prev.map((entry) =>
          entry.item.id === item.id ? { ...entry, quantity: nextQty } : entry
        );
      }
      return [...prev, { item, quantity: safeQty }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((entry) => entry.item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (!Number.isFinite(quantity)) return;
    const rounded = Math.floor(quantity);
    if (rounded <= 0) {
      setItems((prev) => prev.filter((entry) => entry.item.id !== itemId));
      return;
    }
    const clamped = Math.min(MAX_ITEM_QUANTITY, rounded);
    setItems((prev) =>
      prev.map((entry) =>
        entry.item.id === itemId ? { ...entry, quantity: clamped } : entry
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totals = useMemo(() => {
    const totalItems = items.reduce((sum, entry) => sum + entry.quantity, 0);
    const subtotal = items.reduce(
      (sum, entry) => sum + entry.item.price * entry.quantity,
      0
    );
    const deliveryCharge =
      subtotal === 0 ? 0 : subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
    const total = subtotal + deliveryCharge;
    const freeDeliveryRemaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

    return {
      totalItems,
      subtotal,
      deliveryCharge,
      total,
      freeDeliveryRemaining,
    };
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      ...totals,
    }),
    [
      items,
      isDrawerOpen,
      openDrawer,
      closeDrawer,
      toggleDrawer,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totals,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
