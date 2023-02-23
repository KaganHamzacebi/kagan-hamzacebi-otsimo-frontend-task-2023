import styles from '../styles/components/Header.module.scss';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/Logo.png';

function Header() {

  return (
    <>
      <header className={styles.main}>
        <NavLink className={styles.navHome} to="/">
          <img className={styles.logo} src={Logo} alt="logo"/>
          <h1 className={styles.brandName}>Otsimo</h1>
        </NavLink>
        <NavLink className={styles.nav} to="/menu">
          <span>Menu</span>
        </NavLink>
      </header>
    </>
  );
}

export default Header;