import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';

type IngredientItemProps = {
  image: string;
  name: string;
  price: number;
  count?: number;
}

function IngredientItem({image, name, price, count = 0}: IngredientItemProps) {
  return (
    <div className={styles.Ingredient}>
      <img src={image} alt={name} />
      <div className={styles.Price}>
        <span>{price}</span>
        <CurrencyIcon type="primary"/>
      </div>
      <p>{name}</p>
      {count > 0 && (<Counter count={count} />)}
    </div>
  )
}

export default IngredientItem;