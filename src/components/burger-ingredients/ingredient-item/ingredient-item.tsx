import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import { useDrag } from 'react-dnd';

type IngredientItemProps = {
  id: string;
  type?: string;
  image: string;
  name: string;
  price: number;
  count?: number;
}

function IngredientItem({ id, image, name, price, count = 0 }: IngredientItemProps) {
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { id }
  });

  return (
    <div ref={dragRef} className={styles.Ingredient}>
      <img src={image} alt={name} />
      <div className={styles.Price}>
        <span>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p>{name}</p>
      {count > 0 && (<Counter count={count} />)}
    </div>
  )
}

export default IngredientItem;