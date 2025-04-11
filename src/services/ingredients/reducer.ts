import { createSlice, createSelector } from '@reduxjs/toolkit';
import { loadIngredients } from './actions';
import { IngredientModel } from '../../model';

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
  name: 'ingredients',
  reducers: {},
  initialState,
  selectors: {
    getIngredientsLoading: state => state.loading,
    getIngredientsError: state => state.error,
    getAllIngredients: state => state.ingredients,
    getIngredientsByType: createSelector(
      [(state): IngredientModel[] => ingredientsSlice.getSelectors().getAllIngredients(state),
      (_, type) => type
      ]
      ,
      (ingredients, type) => ingredients.filter((ingredient: IngredientModel) => ingredient.type === type)
    ),
    getMappedIngredients: createSelector(
      [(state): IngredientModel[] => ingredientsSlice.getSelectors().getAllIngredients(state)],
      (ingredients) => {
        const ingredientsMap = new Map<string, IngredientModel>();
        ingredients.forEach(ingredient => ingredientsMap.set(ingredient._id, ingredient));
        return ingredientsMap;
      }
    ),
    getIngredientById: createSelector(
      [(state): Map<string, IngredientModel> => ingredientsSlice.getSelectors().getMappedIngredients(state),
      (_, id) => id
      ]
      ,
      (ingredientsMap, id) => ingredientsMap.get(id)
    ),
    getIngredientsByIds: createSelector(
      [(state): Map<string, IngredientModel> => ingredientsSlice.getSelectors().getMappedIngredients(state),
      (_, ids: string[]) => ids
      ]
      ,
      (ingredientsMap, ids) => ids.map(id => ingredientsMap.get(id)).filter(ingredient => ingredient !== undefined)
    ),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || 'Unknown error';
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
  getMappedIngredients,
  getIngredientById,
  getIngredientsByIds
} = ingredientsSlice.selectors;