import { useParams } from 'react-router-dom';
import OrderData from '../../components/orders-list/order-data/order-data';
import styles from './order-details.module.css';

export function OrderDetailsPage() {
  const { number } = useParams();

  return number && (
    <div className={styles.OrderDetails}>
      <span className={styles.Number}>{`#${number}`}</span>
      <OrderData number={Number(number)} />
    </div>
  );
}