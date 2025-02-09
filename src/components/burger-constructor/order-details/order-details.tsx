import styles from './order-details.module.css';
import doneImg from '../../../images/done.png';
import { useSelector } from 'react-redux';
import { getOrderError, getOrderLoading, getOrderNumber } from '../../../services/order/reducer';
import Loader from 'react-ts-loaders';

function OrderDetails() {
  const loading = useSelector(getOrderLoading);
  const error = useSelector(getOrderError);
  const orderNumber = useSelector(getOrderNumber);

  if (loading) {
    return (<div className={styles.Details}><Loader /></div>);
  }

  if (error) {
    return (<p className={styles.Error}>Произошла ошибка ({error}). Попробуйте позже.</p>);
  }

  return (
    <div className={styles.Details}>
      <span className={styles.Number}>{orderNumber}</span>
      <span className={styles.NumberTitle}>идентификатор заказа</span>
      <img className={styles.DoneImg} src={doneImg} alt={'готово'} />
      <span className={styles.DoneTitle}>Ваш заказ начали готовить</span>
      <span className={styles.DoneText}>Дождитесь готовности на орбитальной станции</span>
    </div>
  );
}

export default OrderDetails;