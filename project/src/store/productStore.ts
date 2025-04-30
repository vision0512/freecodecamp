import { create } from 'zustand';
import { Product } from '../types';
import { supabase } from '../lib/supabase';

interface ProductState {
  products: Product[];
  loading: boolean;
  searchTerm: string;
  selectedCategory: string;
  fetchProducts: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  searchTerm: '',
  selectedCategory: '',

  fetchProducts: async () => {
    set({ loading: true });
    try {
      let query = supabase.from('products').select('*');
      
      const { searchTerm, selectedCategory } = get();
      
      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }
      
      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      set({ products: data as Product[] });
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      set({ loading: false });
    }
  },

  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
    get().fetchProducts();
  },

  setSelectedCategory: (category: string) => {
    set({ selectedCategory: category });
    get().fetchProducts();
  },
}));