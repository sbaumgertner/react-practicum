import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationLink from './navigation-link/navigation-link';
import styles from './app-header.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';

function AppHeader() {
  const location = useLocation();

  return (
    <header className={styles.Header}>
      <NavLink className={() => styles.NavLink} to='/'>
        {({isActive}) => (
          <NavigationLink Icon={BurgerIcon} text="Конструктор" isActive={isActive || location.pathname.startsWith('/ingredients/')} />
        )}
      </NavLink>
      <NavLink className={() => styles.NavLink} to='/orders'>
        {({isActive}) => (
          <NavigationLink Icon={ListIcon} text="Лента заказов" isActive={isActive} className="ml-8" />
        )}
      </NavLink>
      <Logo className={styles.Logo} />
      <NavLink className={() => clsx(styles.NavLink, styles.Profile)} to='/profile'>
        {({isActive}) => (
          <NavigationLink Icon={ProfileIcon} text="Личный кабинет" isActive={isActive} />
        )}
      </NavLink>
    </header>
  );
}

export default AppHeader;