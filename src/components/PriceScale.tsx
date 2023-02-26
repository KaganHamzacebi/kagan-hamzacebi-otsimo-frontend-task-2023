import { FaDollarSign } from 'react-icons/fa';
import styles from '../styles/components/PriceScale.module.scss';

const PriceScale = (props: {priceScale: 1 | 2 | 3}) => {
  return (
    props.priceScale === 1 ?
      <FaDollarSign className={styles.dollarSign}/>
      :
      props.priceScale === 2 ?
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
  );
};

export default PriceScale;