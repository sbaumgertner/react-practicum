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
    count?: number;
}

export type IngredientGroupModel = {
    type: string;
    name: string;
}

export type GroupedIngredientsModel = IngredientGroupModel & {
    ingredients: IngredientModel[];
}

export type BurgerRecipeModel = {
    wrap?: IngredientModel;
    stuff: IngredientModel[];
}