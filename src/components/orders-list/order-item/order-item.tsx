import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderModel, orderStatus } from '../../../model';
import styles from './order-item.module.css';
import commonStyles from '../orders-list.module.css';
import clsx from 'clsx';
import { useSelector } from '../../../services/store';
import { getIngredientsByIds } from '../../../services/ingredients/reducer';
import { getCountedIngredients, getPriceByIngredients } from '../../../utils/data-transformers';

type OrderItemProps = {
  order: OrderModel;
}

function OrderItem({ order }: OrderItemProps) {

  const orderIngredients = useSelector(state => getIngredientsByIds(state, order.ingredients));
  const ingredientsGrouped = getCountedIngredients(orderIngredients);
  const price = getPriceByIngredients(orderIngredients);

  return (
    <div className={styles.Card}>
      <div className={styles.CardRow}>
        <span className="text_type_digits-default">#{order.number}</span>
        <FormattedDate date={new Date(order.createdAt)} className={commonStyles.Date} />
      </div>
      <div>
        <h2>{order.name}</h2>
        <span className={clsx(order.status === 'done' && commonStyles.Success)}>
          {orderStatus.get(order.status) || order.status}
        </span>
      </div>
      <div className={styles.CardRow}>
        <div className={styles.Images}>
          {ingredientsGrouped.slice(0, 6).map((ingredient, i) => (
            <div key={i} className={clsx(commonStyles.ImgWrap, styles.ImgWrap)} style={{ zIndex: 100 - i }}>
              <img src={ingredient.image}
                alt={ingredient.name}
                className={clsx(commonStyles.IngredientImg, i === 5 && ingredientsGrouped.length > 6 && styles.ImgOthers)}
              />
              {i === 5
                && ingredientsGrouped.length > 6
                && (<div className={styles.Others}>+{ingredientsGrouped.length - 6}</div>)
              }
            </div>
          ))}
        </div>
        <span className={clsx(styles.Price, commonStyles.Price)}>
          {price}
          <CurrencyIcon className="largeicon" type="primary" />
        </span>
      </div>
    </div>
  )
}

export default OrderItem;