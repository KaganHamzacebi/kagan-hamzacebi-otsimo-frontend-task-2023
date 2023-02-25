import styles from '../styles/modules/Error.module.scss';
import ErrorLogo from '../assets/error.png';
import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();

  return (
    <>
      <main className={styles.main}>
        <img onClick={() => navigate('/')} src={ErrorLogo} className={styles.errorLogo} alt='error_logo' />
        <h1 className={styles.errorMessage}>Sorry the page you looking for does not exist!</h1>
        <span className={styles.returnMessage}>Turn back to home page by clicking the image</span>
      </main>
    </>
  );
}

export default Error;