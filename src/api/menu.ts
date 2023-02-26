import { getMeals } from './meal';
import type { Meal, RawMeal } from '../utils/types';
import { calculateMinMaxPrices } from '../utils/calculateFunctions';

/**
 * Return Menus from external API and modifies with extra properties in order to ease the job of Frontend
 *
 * @return Array<RawMeal>
 */
export const getMenu = async () => {
  const menu = [] as Array<Meal>;
  // Fetch all meals
  const meals: Array<RawMeal> = await getMeals();
  /**
   * Iterate parallelly over fetched meals and fetch Menus
   * Calculate essential data
   */
  await Promise.all(meals.map(async (meal, index) => {
    const menuItem: RawMeal = await getMenuById(meal.id);
    const mealItem = { ...menuItem, averagePrice: 0, priceScale: 1 };
    const [averagePrice, priceScale] = calculateMinMaxPrices(menuItem);
    mealItem.averagePrice = averagePrice;
    mealItem.priceScale = priceScale;
    menu[index] = mealItem as Meal;
  }));

  // Sort the array alphabetically increasing order
  menu.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return menu;
};

const getMenuById = async (id: number) => {
  return await fetch(`https://apis.career.otsimo.xyz/api/restaurant/get/${id}`).then((result) => result.json());
};