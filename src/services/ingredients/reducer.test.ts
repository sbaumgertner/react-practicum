import { describe, expect, it } from 'vitest';
import { ingredientsSlice, initialState } from './reducer';
import { loadIngredients } from './actions';

describe('IngredientsReducerTest', () => {

  const message = {
    success: true,
    data: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      }
    ]
  }

  const error = {
    message: 'Ошибка 404'
  }

  it('initializes correctly', () => {
    const state = ingredientsSlice.reducer(undefined, { type:'' });
    expect(state).toEqual(initialState);
  });

  it('loadIngredients.pending', () => {
    const state = ingredientsSlice.reducer(initialState, {type: loadIngredients.pending.type});
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it('loadIngredients.rejected', () => {
    const state = ingredientsSlice.reducer(initialState, 
      {type: loadIngredients.rejected.type, error: error});
    expect(state).toEqual({ ...initialState, error: error.message });
  });

  it('loadIngredients.fulfilled', () => {
    const state = ingredientsSlice.reducer(initialState, {type: loadIngredients.fulfilled.type, payload: message});
    expect(state).toEqual({...initialState, ingredients: message.data});
  });

});