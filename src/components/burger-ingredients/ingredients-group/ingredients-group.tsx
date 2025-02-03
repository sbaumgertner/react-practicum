import styles from "./ingredients-group.module.css";
import { GroupedIngredientModel } from "../../../model";
import IngredientItem from "../ingredient-item/ingredient-item";

type IngredientsGroupProps = {
  type: string;
  ingredients: GroupedIngredientModel[];
  onIngredientClick: (id: string)=>void;
}

function IngredientsGroup({type, ingredients, onIngredientClick}: IngredientsGroupProps) {
  return (
    <div>
      <h2>{type}</h2>
      <ul className={styles.List}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id} onClick={() => onIngredientClick(ingredient._id)}>
            <IngredientItem  
              image={ingredient.image} 
              name={ingredient.name}
              price={ingredient.price} 
              count={ingredient.count}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientsGroup;