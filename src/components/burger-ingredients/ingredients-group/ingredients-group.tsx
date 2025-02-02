import styles from "./ingredients-group.module.css"
import { IngredientModel } from "../../../model"
import IngredientItem from "../ingredient-item/ingredient-item";

type IngredientsGroupProps = {
    type: string;
    ingredients: IngredientModel[];
}

function IngredientsGroup({type, ingredients}: IngredientsGroupProps) {
    return (
        <article>
            <h2>{type}</h2>
            <ul className={styles.list}>
                {ingredients.map((ingredient) => (
                    <li key={ingredient._id}>
                        <IngredientItem  
                            image={ingredient.image} 
                            name={ingredient.name}
                            price={ingredient.price} 
                            count={ingredient.count}
                        />
                    </li>
                ))}
            </ul>
        </article>

        
    )
}

export default IngredientsGroup