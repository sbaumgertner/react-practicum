import { TIngredientsResponse } from '../../utils/api-types';
import { api } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadIngredients = createAsyncThunk<TIngredientsResponse>(
  'ingredients/loadIngredients',
  api.getIngredients
);

export type IngredientsActionTypes = ReturnType<typeof loadIngredients.pending
  | typeof loadIngredients.fulfilled
  | typeof loadIngredients.rejected>;