import styles from '../styles/components/MenuShimer.module.scss';

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