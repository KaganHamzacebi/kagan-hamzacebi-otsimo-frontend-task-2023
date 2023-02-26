import styles from '../styles/components/MenuShimer.module.scss';

/**
 * Shimmering effect for Menu
 */
const MenuShimmer = () => {
  return (
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
  );
};

export default MenuShimmer;