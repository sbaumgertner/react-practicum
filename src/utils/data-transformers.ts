import { IngredientModel } from '../model';

export function getCountedIngredients(ingredients: Array<IngredientModel | undefined>): Array<IngredientModel & { count: number }> {
  return ingredients.reduce<Array<IngredientModel & { count: number }>>((grouped, ingredient) => {
    const existingIngredient = grouped.find(item => item._id === ingredient?._id);
    if (existingIngredient) {
      existingIngredient.count++;
    }
    else {
      ingredient && grouped.push({ ...ingredient, count: 1 })
    }
    return grouped;
  }, []);
}

export function getPriceByIngredients(ingredients: Array<IngredientModel | undefined>): number {
  return ingredients.reduce((sum, ingredient) => sum += (ingredient?.price || 0), 0);
}