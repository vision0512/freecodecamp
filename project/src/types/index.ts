export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer' | 'delivery' | 'store_owner';
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image_url: string;
  stock: number;
  created_at: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  created_at: string;
  product: Product;
}