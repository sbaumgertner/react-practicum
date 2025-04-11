import { Link, useLocation } from 'react-router';
import { OrderModel } from '../../model';
import OrderItem from './order-item/order-item';
import styles from './orders-list.module.css';

type OrdersListProps = {
  orders: OrderModel[];
}

function OrdersList({ orders }: OrdersListProps) {
  const location = useLocation();

  return (
    <div className={styles.Orders}>
      {orders.map(order =>
      (<Link className={styles.Link} key={order._id} to={`${location.pathname}/${order.number}`} state={{ backgroundLocation: location }}>
        <OrderItem order={order} />
      </Link>)
      )}
    </div>
  );
}

export default OrdersList;