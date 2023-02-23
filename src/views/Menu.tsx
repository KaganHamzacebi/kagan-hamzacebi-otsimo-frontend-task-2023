import Header from '../components/Header';
import { useEffect, useState } from 'react';
import styles from '../styles/modules/Menu.module.scss';

// Icons
import { FaDollarSign } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';

// Types
import type { Meal } from '../utils/types';
import { getMenus } from '../api/menu';

function Menu() {
  const [menu, setMenu] = useState<Array<Meal>>([]);
  const [filteredMenu, setFilteredMenu] = useState<Array<Meal>>([]);

  useEffect(() => {
    getMenus()
      .then((res) => {
        setMenu(res);
        setFilteredMenu(res);
      })
      .catch((err) => console.log(err));
  }, []);

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
              <input
                className={styles.searchInput}
                // implement onChangeHere
                type="checkbox"
              />
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
            <select className={styles.orderInput} placeholder="Order by">
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
          <div className={styles.menuWrapper}>
            {
              menu.length === 0 ?
                <div className={styles.shimmerWrapper}>
                  <div className={styles.shimmer}>
                    <div/>
                  </div>
                  <div className={styles.shimmer}>
                    <div/>
                  </div>
                  <div className={styles.shimmer}>
                    <div/>
                  </div>
                  <div className={styles.shimmer}>
                    <div/>
                  </div>
                  <div className={styles.shimmer}>
                    <div/>
                  </div>
                  <div className={styles.shimmer}>
                    <div/>
                  </div>
                </div>
                :
                menu.map((meal: Meal) => {
                  return (
                    <div className={styles.menuItem} key={meal.id}>
                      <span className={styles.itemName}>{meal.name}</span>
                      <div className={styles.ingredientsWrapper}>
                        {
                          meal.ingredients.map((ingredient) => {
                            return (
                              <div className={styles.ingredientInfo}>
                                <GoPrimitiveDot className={styles.ingredientDecoration}/>
                                <span>{ingredient.name}</span>
                                <span>({ingredient.quantity}</span>
                                <span>{ingredient.quantity_type})</span>
                              </div>
                            );
                          })
                        }
                      </div>
                      <div className={styles.ingredientPrice}>
                        {
                          meal.priceScale === 1 ?
                            <FaDollarSign className={styles.dollarSign}/>
                            :
                            meal.priceScale === 2 ?
                              <div className={styles.priceScale}>
                                <FaDollarSign className={styles.dollarSign}/>
                                <FaDollarSign className={styles.dollarSign}/>
                              </div>
                              :
                              <div className={styles.priceScale}>
                                <FaDollarSign className={styles.dollarSign}/>
                                <FaDollarSign className={styles.dollarSign}/>
                                <FaDollarSign className={styles.dollarSign}/>
                              </div>
                        }
                      </div>
                    </div>
                  );
                })
            }
          </div>
        </section>
      </main>
    </>
  );
}

export default Menu;