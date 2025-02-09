import {createSlice, createSelector} from "@reduxjs/toolkit";
import { loadIngredients } from "./action";
import { IngredientModel } from "../../model";

export type IngredientsState = {
  ingredients: IngredientModel[];
  loading: boolean;
  error?: string;
}

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: undefined,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  reducers: {},
  initialState,
  selectors: {
    getIngredientsLoading: state => state.loading,
    getIngredientsError: state => state.error,
    getAllIngredients:  state => state.ingredients,
    getIngredientsByType: createSelector(
      [(state):IngredientModel[] => ingredientsSlice.getSelectors().getAllIngredients(state), 
        (_, type) => type
      ]
      ,
      (ingredients, type) => ingredients.filter((ingredient: IngredientModel) => ingredient.type === type)
    ),
    getIngredientById: createSelector(
      [(state):IngredientModel[] => ingredientsSlice.getSelectors().getAllIngredients(state), 
        (_, id) => id
      ]
      ,
      (ingredients, id) => ingredients.find((ingredient: IngredientModel) => ingredient._id === id)
    )
  },
  extraReducers: (builder) => {
      builder
          .addCase(loadIngredients.pending, (state) => {
              state.loading = true;
          })
          .addCase(loadIngredients.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error?.message || "Unknown error";
              state.ingredients = [];
          })
          .addCase(loadIngredients.fulfilled, (state, action) => {
              state.loading = false;
              state.ingredients = action.payload.data;
          })
  }
});

export const {
  getAllIngredients,
  getIngredientsError,
  getIngredientsLoading,
  getIngredientsByType,
  getIngredientById
} = ingredientsSlice.selectors;