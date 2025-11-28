import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { MenuItem } from '@/lib/api';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  dietaryTags?: string[];
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: MenuItem, qty?: number) => void;
  updateQty: (itemId: string, qty: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: MenuItem, qty: number = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: qty, dietaryTags: item.dietaryTags }];
    });
  };

  const updateQty = (itemId: string, qty: number) => {
    setItems(prev => prev.map(i => (i.id === itemId ? { ...i, quantity: Math.max(0, qty) } : i)).filter(i => i.quantity > 0));
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
