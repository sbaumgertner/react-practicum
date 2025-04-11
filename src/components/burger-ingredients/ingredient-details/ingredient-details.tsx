import { useSelector } from '../../../services/store';
import styles from './ingredient-details.module.css';
import { getIngredientById } from '../../../services/ingredients/reducer';

function IngredientDetails({ id }: { id: string }) {
  const ingredient = useSelector(
    state => getIngredientById(state, id)
  );

  return (
    ingredient &&
    <div className={styles.Details}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <h2>{ingredient.name}</h2>
      <div className={styles.NutritionalDetails}>
        <div className={styles.NutritionalValue}>
          <span>Калории, ккал</span>
          <span>{ingredient.calories}</span>
        </div>
        <div className={styles.NutritionalValue}>
          <span>Белки</span>
          <span>{ingredient.proteins}</span>
        </div>
        <div className={styles.NutritionalValue}>
          <span>Жиры</span>
          <span>{ingredient.fat}</span>
        </div>
        <div className={styles.NutritionalValue}>
          <span>Углеводы</span>
          <span>{ingredient.carbohydrates}</span>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;
