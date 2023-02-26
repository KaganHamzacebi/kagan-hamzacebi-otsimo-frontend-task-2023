import Header from '../components/Header';
import { useEffect, useState } from 'react';
import styles from '../styles/modules/Menu.module.scss';
import { sortBy } from '../utils/calculateFunctions';

// Icons
import { GoPrimitiveDot } from 'react-icons/go';

// Types
import type { Meal } from '../utils/types';
import { getMenu } from '../api/menu';
import MealModal from '../components/MealModal';
import { useAppDispatch } from '../app/hooks';
import { setModalActivity, setModalProps } from '../features/ModalControllerSlice';
import PriceScale from '../components/PriceScale';
import MenuShimmer from '../components/MenuShimmer';

function Menu() {
  // Original Menu to help reset functions
  const [menu, setMenu] = useState<Array<Meal>>([]);
  // Filtered Menu to show sort, filters e.t.c
  const [filteredMenu, setFilteredMenu] = useState<Array<Meal>>([]);
  const dispatch = useAppDispatch();

  /**
   * Fetch Menu
   */
  useEffect(() => {
    getMenu()
      .then((res) => {
        setMenu(res);
        setFilteredMenu(res);
      })
      .catch((err) => console.log(err));
  });

  /**
   * Picks a random Meal from the Menu and opens the selected food's detail modal
   */
  function suggestFood() {
    const randomMeal = menu[Math.floor(Math.random() * menu.length)];
    dispatch(setModalProps(randomMeal));
    dispatch(setModalActivity(true));
  }

  return (
    <>
      <Header/>
      <MealModal/>
      <main className={styles.main}>
        <section className={styles.filterSection}>
          <div className={styles.search}>
            <span>Search</span>
            <input
              id={'searchInput'}
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
                name="category"
                defaultChecked={true}
                onChange={() => setFilteredMenu(menu)}
                type="radio"
              />
              <span>All</span>
            </div>
            <div className={styles.checkboxWrapper}>
              <input
                className={styles.searchInput}
                name="category"
                onChange={(e) => {
                  if (e.target.checked)
                    setFilteredMenu(menu.filter((meal) => meal.ingredients.every((ingredient) => ingredient.groups?.includes('vegan') || ingredient.groups?.includes('vegetarian'))));

                  else
                    setFilteredMenu(menu);

                }}
                type="radio"
              />
              <span>Vegetarian</span>
            </div>
            <div className={styles.checkboxWrapper}>
              <input
                className={styles.searchInput}
                name="category"
                onChange={(e) => {
                  if (e.target.checked)
                    setFilteredMenu(menu.filter((meal) => meal.ingredients.every((ingredient) => ingredient.groups?.includes('vegan'))));

                  else
                    setFilteredMenu(menu);

                }}
                type="radio"/>
              <span>Vegan</span>
            </div>
          </div>
          <div className={styles.divider}/>
          <div className={styles.sort}>
            <span>Sort By</span>
            <select
              id="orderBySelect"
              className={styles.orderInput}
              onChange={(e) => sortBy(e.target.value, filteredMenu, setFilteredMenu)}
              placeholder="Order by"
            >
              <option value={0}>Name - Increasing</option>
              <option value={1}>Name - Decreasing</option>
              <option value={2}>Price - Increasing</option>
              <option value={3}>Price - Decreasing</option>
            </select>
          </div>
          <div className={styles.divider}/>
          <div className={styles.sort}>
            <span>What should I eat?</span>
            <button
              type={'button'}
              className={styles.suggestButton}
              onClick={suggestFood}
            >
              Suggest
            </button>
          </div>
        </section>
        <section className={styles.menuSection}>
          <div className={styles.menuWrapper}>
            {
              menu.length === 0 ?
                <MenuShimmer />
                :
                filteredMenu.map((meal: Meal) => {
                  return (
                    <div
                      className={styles.menuItem} key={meal.id}
                      onClick={() => {
                        dispatch(setModalProps(meal));
                        dispatch(setModalActivity(true));
                      }}
                    >
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
                        <PriceScale priceScale={meal.priceScale} />
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