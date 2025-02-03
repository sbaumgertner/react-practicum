import styles from './order-details.module.css';
import doneImg from '../../../images/done.png';

function OrderDetails() {
  return (
    <div className={styles.Details}>
      <span className={styles.Number}>034536</span>
      <span className={styles.NumberTitle}>идентификатор заказа</span>
      <img className={styles.DoneImg} src={doneImg} />
      <span className={styles.DoneTitle}>Ваш заказ начали готовить</span>
      <span className={styles.DoneText}>Дождитесь готовности на орбитальной станции</span>
    </div>
  );
}

export default OrderDetails;