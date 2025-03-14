import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/burger-ingredients/ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsError, getIngredientsLoading } from "../../services/ingredients/reducer";
import { AppDispatch } from "../../main";
import { useEffect } from "react";
import { loadIngredients } from "../../services/ingredients/action";
import Loader from "react-ts-loaders";

export function IngredientPage() {
  const params = useParams();

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
  
  return params.id && (
    <IngredientDetails id={params.id} />
  );
}