export type IngredientModel = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export type TabType = 'bun' | 'main' | 'sauce';

export const tabs = new Map<TabType, string>([
  ['bun', 'Булки'],
  ['main', 'Начинки'],
  ['sauce', 'Соусы']
]);

export type ConstructorIngredientModel = IngredientModel & {
  uid: string;
}

export type BurgerRecipeModel = {
  wrap?: ConstructorIngredientModel;
  stuff: ConstructorIngredientModel[];
}