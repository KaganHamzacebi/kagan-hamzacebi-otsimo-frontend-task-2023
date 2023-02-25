import styles from '../styles/components/MealModal.module.scss';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getModal, setModalActivity } from '../features/ModalControllerSlice';

// Icons
import { ImCross } from 'react-icons/im';
import { FaDollarSign } from 'react-icons/fa';
import useOutsideAlerter from '../utils/useOutsideAlerter';
import type { ChangeEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

function MealModal() {
  const isActive = useAppSelector(getModal).active;
  const meal = useAppSelector(getModal).props;
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOutsideClicked, setIsOutsideClicked] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [qualityScore, setQualityScore] = useState<number>(0);
  const [ingredientMap] = useState<Map<string, {price: number, quality: number}>>(new Map());
  useOutsideAlerter(modalRef, setIsOutsideClicked);

  useEffect(() => {
    if (isOutsideClicked) {
      dispatch(setModalActivity(false));
      setIsOutsideClicked(false);
      ingredientMap.clear();
      setTotalPrice(0);
      setQualityScore(0);
    }
  }, [isOutsideClicked]);

  const calculatePriceAndQualityScore = (e: ChangeEvent<HTMLInputElement>) => {
    const [name, rawPrice, rawQuality, quantity] = e.target.value.split(',');
    const price = (Number(quantity) / 1000) * Number(rawPrice);
    const quality = rawQuality === 'low' ? 10 : rawQuality === 'medium' ? 20 : 30;

    ingredientMap.set(name, { price: price, quality: quality });
    setTotalPrice(0);
    let priceCounter = 0;
    let qualityCounter = 0;

    for (const [key, value] of ingredientMap) {
      priceCounter += value.price;
      qualityCounter += value.quality;
    }

    setTotalPrice(Number(priceCounter.toFixed(2)));
    setQualityScore(Number((qualityCounter / ingredientMap.size).toFixed(2)));
  };

  return (
    <>
      <main className={`${styles.main} ${isActive ? styles.active : undefined}`}>
        <div ref={modalRef} className={`${styles.modal} ${isActive ? styles.active : undefined}`}>
          <header className={styles.modalHeader} >
            <ImCross onClick={() => dispatch(setModalActivity(false))} className={styles.cross} />
          </header>
          <div className={styles.modalContent}>
            <div className={styles.mealNameWrapper}>
              <span className={styles.mealName}>{meal?.name}</span>
              {
                meal?.priceScale === 1 ?
                  <FaDollarSign className={styles.mealPrice}/>
                  :
                  meal?.priceScale === 2 ?
                    <div className={styles.priceWrapper}>
                      <FaDollarSign className={styles.mealPrice}/>
                      <FaDollarSign className={styles.mealPrice}/>
                    </div>
                    :
                    <div className={styles.priceWrapper}>
                      <FaDollarSign className={styles.mealPrice}/>
                      <FaDollarSign className={styles.mealPrice}/>
                      <FaDollarSign className={styles.mealPrice}/>
                    </div>
              }
            </div>
            <div className={styles.divider} />
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
                    <div key={id} className={styles.ingredient} >
                      <span>{ingredient.name} ({ingredient.quantity} {ingredient.quantity_type})</span>
                      {
                        ingredient.options.slice(0).reverse().map((opt, optId) => {
                          return (
                            <div key={optId} className={styles.optionWrapper}>
                              <input
                                type={'radio'}
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