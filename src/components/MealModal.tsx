import { useEffect, useRef, useState } from 'react';
import styles from '../styles/components/MealModal.module.scss';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getModal, setModalActivity } from '../features/ModalControllerSlice';
import useOutsideAlerter from '../utils/useOutsideAlerter';

// Types
import type { ChangeEvent } from 'react';

// Icons
import { ImCross } from 'react-icons/im';
import PriceScale from './PriceScale';

/**
 * Meal Details Modal
 */
function MealModal() {
  const meal = useAppSelector(getModal).props;
  const isActive = useAppSelector(getModal).active;
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [qualityScore, setQualityScore] = useState<number>(0);
  const [isOutsideClicked, setIsOutsideClicked] = useState<boolean>(false);
  const [ingredientMap] = useState<Map<string, { price: number, quality: number }>>(new Map());

  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  /**
   * A custom hook to detect if clicked outside the first input and updates second input
   *
   * @input modalRef - The module we want to track if user clicked outside of it
   * @input setIsOutsideClicked - The state we want to update if clicked the outside of first input
   */
  useOutsideAlerter(modalRef, setIsOutsideClicked);

  /**
   * Function that removes all radio button selections
   */
  function clearRadios() {
    const ele = document.querySelectorAll('input[id="radioOption"]') as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < ele.length; i++)
      ele[i].checked = false;
  }

  /**
   * Resets Meal Modal in order to not show previous selections
   */
  function resetModal() {
    dispatch(setModalActivity(false));
    setIsOutsideClicked(false);
    ingredientMap.clear();
    setTotalPrice(0);
    setQualityScore(0);
    clearRadios();
  }

  /**
   * Calculates Price and Quality score with new values which come from parameter e
   * and sets new values to related states
   *
   * @param e ChangeEvent from radio buttons
   */
  const calculatePriceAndQualityScore = (e: ChangeEvent<HTMLInputElement>) => {
    const [name, rawPrice, rawQuality, quantity] = e.target.value.split(',');
    const price = (Number(quantity) / 1000) * Number(rawPrice);
    const quality = rawQuality === 'low' ? 10 : rawQuality === 'medium' ? 20 : 30;

    ingredientMap.set(name, { price: price, quality: quality });
    setTotalPrice(0);
    let priceCounter = 0;
    let qualityCounter = 0;

    // eslint-disable-next-line
    for (const [key, value] of ingredientMap) {
      priceCounter += value.price;
      qualityCounter += value.quality;
    }

    setTotalPrice(Number(priceCounter.toFixed(2)));
    setQualityScore(Number((qualityCounter / ingredientMap.size).toFixed(2)));
  };

  /**
   * Detects is outside clicked of Meal Modal and resets the modal
   */
  useEffect(() => {
    if (isOutsideClicked)
      resetModal();
    // eslint-disable-next-line
  }, [isOutsideClicked]);

  return (
    <>
      <main className={`${styles.main} ${isActive && styles.active}`}>
        <div ref={modalRef} className={`${styles.modal} ${isActive ? styles.active : undefined}`}>
          <header className={styles.modalHeader}>
            <ImCross onClick={() => {
              dispatch(setModalActivity(false));
              clearRadios();
            }} className={styles.cross}/>
          </header>
          <div className={styles.modalContent}>
            <div className={styles.mealNameWrapper}>
              <span className={styles.mealName}>{meal?.name}</span>
              <PriceScale priceScale={meal?.priceScale || 1} />
            </div>
            <div className={styles.divider}/>
            <div className={styles.ingredientHeader}>
              <span>Name</span>
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
            <div className={styles.ingredientWrapper}>
              {
                meal?.ingredients.map((ingredient, id) => {
                  return (
                    <div key={id} className={styles.ingredient}>
                      <span>{ingredient.name} ({ingredient.quantity} {ingredient.quantity_type})</span>
                      {
                        ingredient.options.slice(0).reverse().map((opt, optId) => {
                          return (
                            <div key={optId} className={styles.optionWrapper}>
                              <input
                                type={'radio'}
                                id={'radioOption'}
                                className={styles.optionRadio}
                                onChange={calculatePriceAndQualityScore}
                                name={ingredient.name}
                                value={[ingredient.name, String(opt.price), opt.quality, String(ingredient.quantity)]}
                              />
                              <div className={styles.optionInfoWrapper}>
                                <span>{opt.name}</span>
                                <span>({opt.price}$ per {opt.per_amount})</span>
                              </div>
                            </div>
                          );
                        })
                      }
                    </div>
                  );
                })
              }
            </div>
          </div>
          <footer className={styles.modalFooter}>
            <span>Price: {totalPrice}$</span>
            <span>Quality Score: {qualityScore}/30</span>
          </footer>
        </div>
      </main>
    </>
  );
}

export default MealModal;