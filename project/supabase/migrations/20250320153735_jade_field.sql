/*
  # Initial Schema Setup for Grocery Delivery App

  1. New Tables
    - users (handled by Supabase Auth)
    - products
      - Basic product information
      - Inventory tracking
      - Categories and brands
    - cart_items
      - Shopping cart functionality
      - Quantity tracking
      - User association

  2. Security
    - Enable RLS on all tables
    - Set up access policies for different user roles
*/

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  category text NOT NULL,
  brand text NOT NULL,
  image_url text,
  stock integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Policies for products
CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Store owners can manage products"
  ON products
  USING (
    auth.jwt() ->> 'role' = 'store_owner'
  );

-- Policies for cart items
CREATE POLICY "Users can view their own cart"
  ON cart_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own cart"
  ON cart_items
  USING (auth.uid() = user_id);