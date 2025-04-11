import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import styles from './main.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Loader from 'react-ts-loaders';
import { useSelector } from '../../services/store';
import { getIngredientsError, getIngredientsLoading } from '../../services/ingredients/reducer';
import clsx from 'clsx';

export function MainPage() {
  const loading = useSelector(getIngredientsLoading);
  const error = useSelector(getIngredientsError);

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