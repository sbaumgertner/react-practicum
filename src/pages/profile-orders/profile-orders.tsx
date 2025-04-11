import { useEffect } from 'react';
import Loader from 'react-ts-loaders';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersError, getOrdersList } from '../../services/orders/reducer';
import { connect, disconnect } from '../../services/orders/actions';
import { PROFILE_ORDERS_URL } from '../../utils/burger-api';
import { OrdersListModel } from '../../model';
import OrdersList from '../../components/orders-list/orders-list';
import clsx from 'clsx';
import { addTokenToUrl } from '../../utils/tokens';
import styles from './profile-orders.module.css';
import { Outlet, useParams } from 'react-router';

export function ProfileOrdersPage() {
  const dispatch = useDispatch();
  const error = useSelector(getOrdersError);
  const { number } = useParams();
  const ordersList: OrdersListModel = useSelector(getOrdersList);

  useEffect(() => {
    dispatch(connect(addTokenToUrl(PROFILE_ORDERS_URL)));
    return () => {
      dispatch(disconnect());
    }
  }, [dispatch]);

  if (number) {
    return (<Outlet />);
  }

  if (ordersList.orders.length === 0) {
    return (<section className="loader"><Loader /></section>);
  }

  if (error) {
    return (<p className="error">Произошла ошибка ({error}). Попробуйте позже.</p>);
  }

  return (
    <main className={clsx('content', styles.ProfileOrders)}>
      <OrdersList orders={ordersList.orders} />
    </main>
  );
}