import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import styles from './profile.module.css';
import clsx from 'clsx';
import { useDispatch } from '../../services/store';
import { logout } from '../../services/user/actions';

export function ProfilePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { number } = useParams();

  const doLogout = () => {
    dispatch(logout());
  }

  return (
    <div className={clsx('content', styles.Content)}>
      {!number && (<div className={styles.NavWrap}>
        <nav className={styles.Nav}>
          <NavLink className={({ isActive }) => isActive || location.pathname === '/profile' ? styles.NavLinkActive : styles.NavLink} to="account">
            Профиль
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? styles.NavLinkActive : styles.NavLink} to="orders">
            История заказов
          </NavLink>
          <div className={styles.NavLink} onClick={doLogout}>Выход</div>
        </nav>
      </div>)}
      <div className={styles.Outlet}>
        <Outlet />
      </div>
    </div>
  );
}