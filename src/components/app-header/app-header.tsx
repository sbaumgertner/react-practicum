import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationLink from './navigation-link/navigation-link';
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={styles.Header}>
      <NavigationLink Icon={BurgerIcon} text="Конструктор" isActive={true} />
      <NavigationLink Icon={ListIcon} text="Лента заказов" className="ml-8" />
      <Logo className={styles.Logo} />
      <NavigationLink Icon={ProfileIcon} text="Личный кабинет" className={styles.Profile} />
    </header>
  );
}

export default AppHeader;