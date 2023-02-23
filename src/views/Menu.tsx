import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { getMenus } from '../api/menu';
import styles from '../styles/modules/Menu.module.scss';

function Menu() {
  const [menu, setMenu] = useState<Array<any>>([]);

  useEffect(() => {
    getMenus()
      .then((res) => {
        setMenu(res);
        console.log(menu);
      })
      .catch((err) => console.log(err));
  });

  return (
    <>
      <Header/>
      <main className={styles.main}>
        <section className={styles.filterSection}>
          <div className={styles.search}>
            <span>Search</span>
            <input className={styles.searchInput} type="text" placeholder="Type your food"/>
          </div>
          <div className={styles.divider}/>
          <div className={styles.category}>
            <span>Category</span>
            <div className={styles.checkboxWrapper}>
              <input className={styles.searchInput} type="checkbox"/>
              <span>Vegetarian</span>
            </div>
            <div className={styles.checkboxWrapper}>
              <input className={styles.searchInput} type="checkbox"/>
              <span>Vegan</span>
            </div>
          </div>
          <div className={styles.divider}/>
          <div className={styles.sort}>
            <span>Sort By</span>
            <select placeholder="Order by">
              <option>Name - Increasing</option>
              <option>Name - Decreasing</option>
              <option>Minimum Possible Price</option>
              <option>Maximum Possible Price</option>
              <option>Minimum Quantity</option>
              <option>Maximum Quantity</option>
            </select>
          </div>
        </section>
        <section className={styles.menuSection}>
          {
            menu.map((meal) => {
              return (
                <div>
                  123
                </div>
              );
            })
          }
        </section>
      </main>
    </>
  );
}

export default Menu;