/**
 * Return Menus from external API and modifies with extra properties in order to ease the job of Frontend
 *
 * @return Array<Meal>
 */

export const getMeals = async () => {
  return await fetch('https://apis.career.otsimo.xyz/api/restaurant/listMeals').then((result) => result.json());
};