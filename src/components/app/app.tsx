
import { useState, useEffect } from 'react'
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import styles from './app.module.css'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import { BurgerRecipeModel, IngredientModel } from '../../model'
import Loader from 'react-ts-loaders'
import sample from 'lodash-es/sample'

const URL = 'https://norma.nomoreparties.space/api/ingredients'

function App() {
    const [error, setError] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [ingredients, setIngredients] = useState<IngredientModel[]>([])
    const [recipe, setRecipe] = useState<BurgerRecipeModel>({stuff: []})

    function generateComposition(data: IngredientModel[]) {
      const wrap = sample(data.filter(ingredient => ingredient.type === 'bun'))
      const stuff: IngredientModel[] = []
      Array.from({ length: 7 }).forEach(() => {
        const random = sample(data.filter(ingredient => ingredient.type !== 'bun'))
        random && stuff.push(random)
      })
      setRecipe({wrap: wrap, stuff: stuff})
      
      const ingredientsCount = [...data]
      const wrapIngredient = ingredientsCount.find(ingredient => ingredient._id === wrap?._id)
      wrapIngredient && (wrapIngredient.count = 2)
      stuff.forEach(stuffItem => {
        const item = ingredientsCount.find(ingredient => ingredient._id === stuffItem?._id)
        item && (item.count ? item.count++ : item.count = 1)
      })
      setIngredients(ingredientsCount)
    }

    useEffect(() => {
      const getIngredients = async () => {
        try {
          setLoading(true)
          const res = await fetch(URL)
          const data = await res.json()
          generateComposition(data.data)
          setLoading(false)
        }
        catch (error: unknown) {
          setError((error as Error).message)
          setLoading(false)
        }
      }
  
      getIngredients()
    }, [])
    
    return (
      <>
        {loading && (<section className={styles.loader}><Loader /></section>)}
        <AppHeader />
        <main className={styles.main}>
          {error ? (<p className={styles.error}>Произошла ошибка ({error}). Попробуйте позже.</p>) :
          (
            <>
              <BurgerIngredients ingredients={ingredients} />
              <BurgerConstructor recipe={recipe} />
            </>
          )}
        </main>
      </>
    )
  }
  
  export default App