import { create } from 'zustand';
import { CartItem, Product } from '../types';
import { supabase } from '../lib/supabase';
import { Decimal } from 'decimal.js';

interface CartState {
  items: CartItem[];
  loading: boolean;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  fetchCart: () => Promise<void>;
  getTotal: () => Decimal;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,

  addToCart: async (product: Product, quantity = 1) => {
    try {
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('product_id', product.id)
        .single();

      if (existingItem) {
        await get().updateQuantity(existingItem.id, existingItem.quantity + quantity);
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert([
            {
              product_id: product.id,
              quantity,
            },
          ]);

        if (error) throw error;
      }

      await get().fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  },

  removeFromCart: async (cartItemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId);

      if (error) throw error;
      await get().fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  },

  updateQuantity: async (cartItemId: string, quantity: number) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId);

      if (error) throw error;
      await get().fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  },

  fetchCart: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products(*)
        `);

      if (error) throw error;
      set({ items: data as CartItem[] });
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      set({ loading: false });
    }
  },

  getTotal: () => {
    return get().items.reduce((total, item) => {
      return total.plus(new Decimal(item.product.price).times(item.quantity));
    }, new Decimal(0));
  },
}));