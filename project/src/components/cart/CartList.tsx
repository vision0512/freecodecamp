import React, { useEffect } from 'react';
import { useCartStore } from '../../store/cartStore';
import { CartItem } from './CartItem';

export const CartList = () => {
  const { items, loading, fetchCart, getTotal } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Your cart is empty
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Add some products to your cart to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
          <p>Subtotal</p>
          <p>${getTotal().toFixed(2)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <button className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};