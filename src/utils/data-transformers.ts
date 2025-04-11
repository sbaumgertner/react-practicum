import { IngredientModel } from '../model';

export function getCountedIngredients(ingredients: IngredientModel[]): Array<IngredientModel & { count: number }> {
  return ingredients.reduce<Array<IngredientModel & { count: number }>>((grouped, ingredient) => {
    const existingIngredient = grouped.find(item => item._id === ingredient._id);
    if (existingIngredient) {
      existingIngredient.count++;
    }
    else {
      grouped.push({ ...ingredient, count: 1 })
    }
    return grouped;
  }, []);
}

export function getPriceByIngredients(ingredients: IngredientModel[]): number {
  return ingredients.reduce((sum, ingredient) => sum += ingredient.price, 0);
}