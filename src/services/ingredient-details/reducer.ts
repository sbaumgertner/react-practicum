import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientModel } from "../../model";

const initialState: {ingredient: IngredientModel | undefined} = {
  ingredient: undefined
}

export const ingredientDetailsSlice = createSlice({
    name: "ingredientDetails",
    initialState,
    reducers: {
        setIngredient(state, action: PayloadAction<{ingredient: IngredientModel}>){
          state.ingredient = action.payload.ingredient;
        },
        resetIngredient(state){
          state.ingredient = undefined;
        }
    },
    selectors: {
      getIngredient: state => state.ingredient,
    }
});

export const { setIngredient, resetIngredient } = ingredientDetailsSlice.actions;
export const { getIngredient } = ingredientDetailsSlice.selectors;