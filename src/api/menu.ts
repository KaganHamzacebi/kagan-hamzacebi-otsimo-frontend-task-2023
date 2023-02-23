import type { Meal } from '../utils/types';

export const getMenus = async () => {
  const menu = [] as Array<Meal>;
  for (let i = 1; i < 10; i++) {
    const res: Meal = await fetch(`https://apis.career.otsimo.xyz/api/restaurant/get/${i}`).then(r => r.json());
    // Calculate Min and Max possible prices
    let minPossible = 0;
    let maxPossible = 0;
    res.ingredients.forEach((ingredient) => {
      minPossible += ingredient.options[ingredient.options.length - 1].price;
      maxPossible += ingredient.options[0].price;
    });

    const avg = (minPossible + maxPossible) / 2;

    res.averagePrice = avg;
    res.priceScale = avg <= 15 ? 1 : avg <= 20 ? 2 : 3;

    menu[i - 1] = res;
    menu.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }
  return menu;
};