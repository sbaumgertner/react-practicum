import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import { useSelector } from '../../services/store';
import { getIngredientsError, getIngredientsLoading } from '../../services/ingredients/reducer';
import Loader from 'react-ts-loaders';

export function IngredientPage() {
  const params = useParams();

  const loading = useSelector(getIngredientsLoading);
  const error = useSelector(getIngredientsError);

  if (loading) {
    return (<section className="loader"><Loader /></section>);
  }

  if (error) {
    return (<p className="error">Произошла ошибка ({error}). Попробуйте позже.</p>);
  }

  return params.id && (
    <IngredientDetails id={params.id} />
  );
}