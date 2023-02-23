import Header from '../components/Header';
import { useEffect, useState } from 'react';
import styles from '../styles/modules/Menu.module.scss';

// Icons
import { FaDollarSign } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';

// Types
import type { Meal } from '../utils/types';
import { getMenus } from '../api/menu';
import MealModal from '../components/MealModal';

function Menu() {
  const [modalProps, setModalProps] = useState<Meal>();
  const [menu, setMenu] = useState<Array<Meal>>([]);
  const [filteredMenu, setFilteredMenu] = useState<Array<Meal>>([]);

  function sortBy(id: string) {
    switch (id) {
    case '0':
      setFilteredMenu([...filteredMenu].sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      }));
      break;
    case '1':
      setFilteredMenu([...filteredMenu].sort((a, b) => {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      }));
      break;
    case '2':
      setFilteredMenu([...filteredMenu].sort((a, b) => a.averagePrice - b.averagePrice));
      break;
    case '3':
      setFilteredMenu([...filteredMenu].sort((a, b) => b.averagePrice - a.averagePrice));
      break;
    default:
      throw new Error('Unexpected value');
    }
  }

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
      <MealModal />
      <main className={styles.main}>
        <section className={styles.filterSection}>
          <div className={styles.search}>
            <span>Search</span>
            <input
              className={styles.searchInput}
              onChange={(e) => {
                setFilteredMenu(menu.filter((meal) => meal.name.toLowerCase().includes(e.target.value.toLowerCase())));
              }}
              type="text"
              placeholder="Type your food"/>
          </div>
          <div className={styles.divider}/>
          <div className={styles.category}>
            <span>Category</span>
            <div className={styles.checkboxWrapper}>
              <input
                className={styles.searchInput}
                onChange={(e) => {
                  if (e.target.checked)
                    setFilteredMenu(menu.filter((meal) => meal.ingredients.every((ingredient) => ingredient.groups?.includes('vegan') || ingredient.groups?.includes('vegetarian'))));
                  else
                    setFilteredMenu(menu);
                }}
                type="checkbox"
              />
              <span>Vegetarian</span>
            </div>
            <div className={styles.checkboxWrapper}>
              <input
                className={styles.searchInput}
                onChange={(e) => {
                  if (e.target.checked)
                    setFilteredMenu(menu.filter((meal) => meal.ingredients.every((ingredient) => ingredient.groups?.includes('vegan'))));
                  else
                    setFilteredMenu(menu);
                }}
                type="checkbox"/>
              <span>Vegan</span>
            </div>
          </div>
          <div className={styles.divider}/>
          <div className={styles.sort}>
            <span>Sort By</span>
            <select
              className={styles.orderInput}
              onChange={(e) => sortBy(e.target.value)}
              placeholder="Order by"
            >
              <option value={0}>Name - Increasing</option>
              <option value={1}>Name - Decreasing</option>
              <option value={2}>Price - Increasing</option>
              <option value={3}>Price - Decreasing</option>
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
                filteredMenu.map((meal: Meal) => {
                  return (
                    <div className={styles.menuItem} key={meal.id}>
                      <span className={styles.itemName}>{meal.name}</span>
                      <div className={styles.ingredientsWrapper}>
                        {
                          meal.ingredients.map((ingredient, id) => {
                            return (
                              <div key={id} className={styles.ingredientInfo}>
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