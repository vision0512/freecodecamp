import React from 'react';
import { useProductStore } from '../../store/productStore';

const categories = [
  'All',
  'Fruits & Vegetables',
  'Dairy & Eggs',
  'Meat & Fish',
  'Bakery',
  'Beverages',
  'Snacks',
];

export const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory } = useProductStore();

  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};