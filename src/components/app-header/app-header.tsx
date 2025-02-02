import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationLink from './navigation-link/navigation-link';
import styles from './app-header.module.css';

function AppHeader() {
    return (
        <header className={styles.header}>
            <NavigationLink Icon={BurgerIcon} text="Конструктор" isActive={true} />
            <NavigationLink Icon={ListIcon} text="Лента заказов" className="ml-8" />
            <Logo className={styles.logo}/>
            <NavigationLink Icon={ProfileIcon} text="Личный кабинет" className={styles.profile}/>
        </header>
    )
}

export default AppHeader;