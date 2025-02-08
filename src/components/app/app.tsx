
import { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import styles from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Loader from 'react-ts-loaders';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsError, getIngredientsLoading } from '../../services/ingredients/reducer';
import { loadIngredients } from '../../services/ingredients/action';
import { AppDispatch } from '../../main';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector(getIngredientsLoading);
    const error = useSelector(getIngredientsError);

    useEffect(() => {
      dispatch(loadIngredients());
    }, [dispatch]);

    if (loading) {
      return (<section className={styles.Loader}><Loader /></section>);
    }

    if (error) {
      return (<p className={styles.Error}>Произошла ошибка ({error}). Попробуйте позже.</p>);
    }
    
    return (
      <>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <main className={styles.Main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </DndProvider>
      </>
    );
  }
  
  export default App;