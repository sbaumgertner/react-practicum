import { createSelector, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { BurgerRecipeModel, IngredientModel } from "../../model";

const initialState: {recipe: BurgerRecipeModel} = {
    recipe: {
      stuff: []
    }
}

export const burgerConstructorSlice = createSlice({
    name: "burgerConstructor",
    initialState,
    reducers: {
        addIngredient(state, action: PayloadAction<{ingredient: IngredientModel}>){
          if (action.payload.ingredient.type === 'bun') {
            state.recipe.wrap = action.payload.ingredient;
          }
          else {
            state.recipe.stuff.push({...action.payload.ingredient, uid: nanoid()});
          }
        },
        deleteIngredient(state, action: PayloadAction<{uid: string}>){
          state.recipe.stuff = state.recipe.stuff.filter(ingredient => ingredient.uid !== action.payload.uid);
        },
        moveIngredient(state, action: PayloadAction<{uidFrom: string, uidTo: string}>){
          const stuff = [...state.recipe.stuff];
          const toIndex = stuff.findIndex(ingredient => ingredient.uid === action.payload.uidTo);
          const fromIndex = stuff.findIndex(ingredient => ingredient.uid === action.payload.uidFrom);
          stuff.splice(toIndex, 0, stuff.splice(fromIndex, 1)[0]);
          state.recipe.stuff = stuff;
        }
    },
    selectors: {
      getRecipe: state => state.recipe,
      getIngredientsCount: createSelector(
        [
          (state: {recipe: BurgerRecipeModel}) => state.recipe
        ]
        ,
        (recipe: BurgerRecipeModel) => {
          let ingredientsCount = new Map<string, number>();
          if (recipe.wrap) {
            ingredientsCount.set(recipe.wrap._id, 2);
          }
          ingredientsCount = recipe.stuff.reduce((result: Map<string,number>, ingredient: IngredientModel) => 
          result.has(ingredient._id) ? 
            result.set(ingredient._id, (result.get(ingredient._id) || 0) + 1) :
            result.set(ingredient._id, 1), ingredientsCount);
          return ingredientsCount;
        }
      ),
      getPrice: createSelector(
        [
          (state: {recipe: BurgerRecipeModel}) => state.recipe
        ]
        ,
        (recipe: BurgerRecipeModel) => 
          recipe.stuff.reduce((sum, ingredient) => sum += ingredient.price, 0)
          + (recipe.wrap?.price || 0) * 2
      )
    }
});

export const { addIngredient, deleteIngredient, moveIngredient } = burgerConstructorSlice.actions;
export const { getRecipe, getIngredientsCount, getPrice } = burgerConstructorSlice.selectors;