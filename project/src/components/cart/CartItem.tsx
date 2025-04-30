import React from 'react';
import { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { TrashIcon } from '@heroicons/react/24/outline';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();

  return (
    <li className="py-6 flex">
      {item.product.image_url && (
        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
          <img
            src={item.product.image_url}
            alt={item.product.name}
            className="w-full h-full object-center object-cover"
          />
        </div>
      )}
      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
            <h3>{item.product.name}</h3>
            <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {item.product.brand}
          </p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center">
            <label
              htmlFor={`quantity-${item.id}`}
              className="mr-2 text-gray-500 dark:text-gray-400"
            >
              Qty
            </label>
            <select
              id={`quantity-${item.id}`}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              className="rounded-md border-gray-300 dark:border-gray-600 py-1.5 text-base leading-5 font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </li>
  );
};