export const getMenus = async () => {
  const menu = [];
  for (let i = 1; i < 10; i++) {
    const res = await fetch(`https://apis.career.otsimo.xyz/api/restaurant/get/${i}`).then(r => r.json());
    menu[i - 1] = res;
  }
  return menu;
};