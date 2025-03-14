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

export type UserModel = {
  name: string;
  email: string;
}

export type UserData = {
  email?: string;
  password: string;
  name?: string;
}

export type LoginData = {
  email: string;
  password: string;
}

export type OrderModel = {
  name: string;
  order: {number: number};
}