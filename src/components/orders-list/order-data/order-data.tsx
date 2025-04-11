import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderStatus } from '../../../model';
import styles from './order-data.module.css';
import commonStyles from '../orders-list.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from '../../../services/store';
import { getIngredientsByIds } from '../../../services/ingredients/reducer';
import { getOrderByNumber as getProfileOrder } from '../../../services/orders/reducer';
import { getOrderByNumber as getFeedOrder } from '../../../services/feed/reducer';
import { getOrder } from '../../../services/order/actions';
import { getOrderData, getOrderError, getOrderLoading } from '../../../services/order/reducer';
import { useEffect, useState } from 'react';
import Loader from 'react-ts-loaders';
import { getCountedIngredients, getPriceByIngredients } from '../../../utils/data-transformers';

function OrderData({ number }: { number: number }) {
  const dispatch = useDispatch();

  const feedOrder = useSelector(state => getFeedOrder(state, number));
  const profileOrder = useSelector(state => getProfileOrder(state, number));
  const orderData = useSelector(getOrderData);
  const order = feedOrder || profileOrder || orderData;
  const ingredientIds = order?.ingredients || [];
  const ingredients = useSelector(state => getIngredientsByIds(state, ingredientIds));
  const loading = useSelector(getOrderLoading);
  const error = useSelector(getOrderError);
  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    if (!order && !dispatched) {
      dispatch(getOrder(number));
      setDispatched(true);
    }
  }, [number, order, dispatched, dispatch]);

  if (loading) {
    return (<section className="loader"><Loader /></section>);
  }

  if (error) {
    return (<p className="error">Произошла ошибка ({error}). Попробуйте позже.</p>);
  }

  const ingredientsGrouped = getCountedIngredients(ingredients);
  const price = getPriceByIngredients(ingredients);

  return (order &&
    <div className={styles.Order}>
      <h2 className="mb-3">{order.name}</h2>
      <span className={clsx(order.status === 'done' && commonStyles.Success)}>
        {orderStatus.get(order.status) || order.status}
      </span>
      <h2 className="mt-15 mb-6">Состав:</h2>
      <ul className={styles.Ingredients}>
        {ingredientsGrouped.map((ingredient) => (
          <li key={ingredient._id} className={styles.Ingredient}>
            <div className={styles.IngredientTitle}>
              <div className={commonStyles.ImgWrap}>
                <img src={ingredient.image}
                  alt={ingredient.name}
                  className={commonStyles.IngredientImg}
                />
              </div>
              <span>{ingredient.name}</span>
            </div>
            <span className={clsx(styles.Price, commonStyles.Price)}>
              {`${ingredient.count} x ${ingredient.price}`}
              <CurrencyIcon className="largeicon" type="primary" />
            </span>
          </li>
        ))}
      </ul>
      <div className={styles.Summary}>
        <FormattedDate date={new Date(order.createdAt)} className={commonStyles.Date} />
        <span className={clsx(styles.Price, commonStyles.Price)}>
          {price}
          <CurrencyIcon className="largeicon" type="primary" />
        </span>
      </div>
    </div>
  )
}

export default OrderData;