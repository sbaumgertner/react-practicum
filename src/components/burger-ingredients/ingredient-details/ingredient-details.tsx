import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';
import { getIngredient } from '../../../services/ingredient-details/reducer';

function IngredientDetails() {
  const ingredient = useSelector(getIngredient);
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
