import styles from "./ingredients-group.module.css";
import { IngredientModel, TabType, tabs } from "../../../model";
import IngredientItem from "../ingredient-item/ingredient-item";
import { useSelector } from "react-redux";
import { getIngredientsByType, IngredientsState } from "../../../services/ingredients/reducer";
import { getIngredientsCount } from "../../../services/constructor/reducer";
import { Link, useLocation } from "react-router-dom";

function IngredientsGroup({ type }: {type: TabType}) {
  const location = useLocation();
  const ingredients = useSelector<{ingredients: IngredientsState}, IngredientModel[]>(
    state => getIngredientsByType(state, type)
  );
  const ingredientsCount = useSelector(getIngredientsCount);

  return (
    <div>
      <h2>{tabs.get(type)}</h2>
      <div className={styles.List}>
        {ingredients.map((ingredient) => (
          <Link className={styles.Link} key={ingredient._id} to={`/ingredients/${ingredient._id}`} state={{backgroundLocation: location}}>
            <IngredientItem
              id={ingredient._id}
              type={ingredient.type}
              image={ingredient.image} 
              name={ingredient.name}
              price={ingredient.price} 
              count={ingredientsCount.get(ingredient._id)}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default IngredientsGroup;