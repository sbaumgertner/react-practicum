import styles from "./ingredients-group.module.css";
import { IngredientModel, TabType, tabs } from "../../../model";
import IngredientItem from "../ingredient-item/ingredient-item";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsByType, IngredientsState } from "../../../services/ingredients/reducer";
import { setIngredient } from "../../../services/ingredient-details/reducer";
import { getIngredientsCount } from "../../../services/constructor/reducer";

function IngredientsGroup({ type }: {type: TabType}) {

  const dispatch = useDispatch();
  const ingredients = useSelector<{ingredients: IngredientsState}, IngredientModel[]>(
    state => getIngredientsByType(state, type)
  );
  const ingredientsCount = useSelector(getIngredientsCount);

  function showIngredientDetails(ingredient: IngredientModel){
    dispatch(setIngredient({ingredient: ingredient}));
  }

  return (
    <div>
      <h2>{tabs.get(type)}</h2>
      <ul className={styles.List}>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id} onClick={() => showIngredientDetails(ingredient)}>
            <IngredientItem
              id={ingredient._id}
              type={ingredient.type}
              image={ingredient.image} 
              name={ingredient.name}
              price={ingredient.price} 
              count={ingredientsCount.get(ingredient._id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredientsGroup;