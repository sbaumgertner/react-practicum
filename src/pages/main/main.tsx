import { useEffect } from 'react';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import styles from './main.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Loader from 'react-ts-loaders';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsError, getIngredientsLoading } from '../../services/ingredients/reducer';
import { loadIngredients } from '../../services/ingredients/action';
import { AppDispatch } from '../../main';
import clsx from 'clsx';


export function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(getIngredientsLoading);
  const error = useSelector(getIngredientsError);

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  if (loading) {
    return (<section className='loader'><Loader /></section>);
  }

  if (error) {
    return (<p className='error'>Произошла ошибка ({error}). Попробуйте позже.</p>);
  }
  
  return (
    <main className={clsx(styles.Main, 'content')}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}