import { Link, useLocation } from 'react-router';
import { OrderModel } from '../../model';
import OrderItem from './order-item/order-item';
import styles from './orders-list.module.css';

type OrdersListProps = {
  orders: OrderModel[];
}

function OrdersList({ orders }: OrdersListProps) {
  const location = useLocation();

  const checkOrder = (order: OrderModel): boolean => {
    return Boolean(order._id
      && order.name
      && order.number
      && order.status
      && order.createdAt
      && order.ingredients);
  }

  return (
    <div className={styles.Orders}>
      {orders.map(order =>
        checkOrder(order) && (<Link className={styles.Link} key={order._id} to={`${location.pathname}/${order.number}`} state={{ backgroundLocation: location }}>
          <OrderItem order={order} />
        </Link>)
      )}
    </div>
  );
}

export default OrdersList;