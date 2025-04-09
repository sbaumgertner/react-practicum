import { useEffect } from 'react';
import styles from './feed.module.css';
import Loader from 'react-ts-loaders';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersError, getOrdersList } from '../../services/feed/reducer';
import { connect, disconnect } from '../../services/feed/actions';
import { ORDERS_URL } from '../../utils/burger-api';
import { OrdersListModel } from '../../model';
import OrdersList from '../../components/orders-list/orders-list';
import clsx from 'clsx';
import { Outlet, useParams } from 'react-router';


export function FeedPage() {
  const dispatch = useDispatch();
  const error = useSelector(getOrdersError);
  const { number } = useParams();
  const ordersList: OrdersListModel = useSelector(getOrdersList);

  const doneOrderNumbers = ordersList.orders.filter(order => order.status === 'done')
    .slice(0, 10)
    .map(order => order.number);

  const pendingOrderNumbers = ordersList.orders.filter(order => order.status === 'pending')
    .slice(0, 10)
    .map(order => order.number);

  useEffect(() => {
    dispatch(connect(ORDERS_URL));
    return () => {
      dispatch(disconnect());
    }
  }, [dispatch]);

  if (number) {
    return (
      <div className={clsx('content', styles.Content)}>
        <Outlet />
      </div>
    );
  }

  if (ordersList.orders.length === 0) {
    return (<section className="loader"><Loader /></section>);
  }

  if (error) {
    return (<p className="error">Произошла ошибка ({error}). Попробуйте позже.</p>);
  }

  return (
    <main className={clsx('content', styles.Feed)}>
      <section>
        <h1 className="mt-10">Лента заказов</h1>
        <div className={styles.Orders}>
          <OrdersList orders={ordersList.orders} />
        </div>
      </section>
      <section className={styles.Stat}>
        <div className={styles.Statuses}>
          <div>
            <h2>Готовы:</h2>
            <ul className={`${styles.Numbers} ${styles.Success}`}>
              {doneOrderNumbers.map(number => (
                <li key={number}>{number}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>В работе:</h2>
            <ul className={styles.Numbers}>
              {pendingOrderNumbers.map(number => (
                <li key={number}>{number}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.Total}>
          <h2>Выполнено за все время:</h2>
          <span className="text_type_digits-large">{ordersList.total}</span>
        </div>
        <div className={styles.TotalToday}>
          <h2>Выполнено за сегодня:</h2>
          <span className="text_type_digits-large">{ordersList.totalToday}</span>
        </div>
      </section>
    </main>
  );
}