
import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { BurgerRecipeModel, IngredientCountModel, IngredientModel } from '../../model';
import Loader from 'react-ts-loaders';
import sample from 'lodash-es/sample';
import { getIngredients } from '../../utils/burger-api';

function App() {
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [ingredients, setIngredients] = useState<IngredientModel[]>([]);
    const [recipe, setRecipe] = useState<BurgerRecipeModel>({stuff: []});
    const [ingredientsCount, setIngredientsCount] = useState<IngredientCountModel[]>([]);

    function generateRecipe() {
      const ingredientsCountNew:IngredientCountModel[] = [];

      const wrap = sample(ingredients.filter(ingredient => ingredient.type === 'bun'));
      wrap && ingredientsCountNew.push({id: wrap._id, count: 2});

      const stuff: IngredientModel[] = [];
      Array.from({ length: 7 }).forEach(() => {
        const random = sample(ingredients.filter(ingredient => ingredient.type !== 'bun'));
        if (random) {
          stuff.push(random);
          const ingredientCount = ingredientsCountNew.find(count => count.id === random?._id);
          ingredientCount ? ingredientCount.count += 1 : ingredientsCountNew.push({id: random._id, count: 1});
        }
      });
      setRecipe({wrap: wrap, stuff: stuff});
      setIngredientsCount(ingredientsCountNew);
    }

    useEffect(() => {
      const getIngredientsData = async () => {
        try {
          setError(undefined);
          setLoading(true);
          const data = await getIngredients();
          setIngredients(data.data);
          setLoading(false);
        }
        catch (error: unknown) {
          setError(error instanceof Error ? error.message : 'Неизвестная ошибка');
          setLoading(false);
        }
      };
  
      getIngredientsData();
    }, []);

    useEffect(() => {
      generateRecipe();
    }, [ingredients]);
    
    return (
        loading ? <section className={styles.Loader}><Loader /></section> :
          <>
            <AppHeader />
            <main className={styles.Main}>
              {error ? (<p className={styles.Error}>Произошла ошибка ({error}). Попробуйте позже.</p>) :
              (
                <>
                  <BurgerIngredients ingredients={ingredients} ingredientsCount={ingredientsCount} />
                  <BurgerConstructor recipe={recipe} />
                </>
              )}
            </main>
          </>
    );
  }
  
  export default App;