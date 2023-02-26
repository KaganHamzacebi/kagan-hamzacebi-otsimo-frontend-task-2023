import type { Meal, RawMeal } from './types';
import type { Dispatch, SetStateAction } from 'react';

/**
 * Calculates the Average Price and Price Scale properties by given RawMeal
 * Using in api/menu.ts
 *
 * @param meal: Raw Meal object
 */
export const calculateMinMaxPrices = (meal: RawMeal) => {
  let minPossible = 0;
  let maxPossible = 0;
  meal.ingredients.forEach((ingredient) => {
    minPossible += ingredient.options[ingredient.options.length - 1].price;
    maxPossible += ingredient.options[0].price;
  });

  const avg = (minPossible + maxPossible) / 2;
  const priceScale = avg <= 15 ? 1 : avg <= 20 ? 2 : 3;
  return [avg, priceScale];
};

/**
 * Mass sorting function bind to HTML Select component's onChange event
 * Using in views/Menu.tsx
 *
 * @param id: Option value comes from HTML Select component
 * @param filteredMenu: Array to sort
 * @param setFilteredMenu: Dispatch function to update array
 */
export const sortBy = (id: string, filteredMenu: Array<Meal>, setFilteredMenu: Dispatch<SetStateAction<Meal[]>>) => {
  switch (id) {
  // Sort by Alphabetically Increasing Order
  case '0':
    setFilteredMenu([...filteredMenu].sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    }));
    break;
    // Sort by Alphabetically Decreasing Order
  case '1':
    setFilteredMenu([...filteredMenu].sort((a, b) => {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    }));
    break;
    // Sort by Price - Increasing Order
  case '2':
    setFilteredMenu([...filteredMenu].sort((a, b) => a.averagePrice - b.averagePrice));
    break;
    // Sort by Price - Decreasing Order
  case '3':
    setFilteredMenu([...filteredMenu].sort((a, b) => b.averagePrice - a.averagePrice));
    break;
  default:
    throw new Error('Unexpected value');
  }
};