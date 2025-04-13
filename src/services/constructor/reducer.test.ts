import { describe, expect, it } from 'vitest';
import { addIngredient, burgerConstructorSlice, deleteIngredient, initialState, moveIngredient } from './reducer';
import { ConstructorIngredientModel } from '../../model';

describe('ConstructorReducerTest', () => {

  const bun: ConstructorIngredientModel = {
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
    __v: 0,
    uid: '54321'
  }

  const bun2: ConstructorIngredientModel = {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
    uid: '56789'
  }

  const stuff: ConstructorIngredientModel = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0,
    uid: '12345'
  }

  const stuff2: ConstructorIngredientModel = {
    _id: '123d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформаv 2',
    type: 'main',
    proteins: 55,
    fat: 33,
    carbohydrates: 77,
    calories: 543,
    price: 765,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0,
    uid: '34567'
  }

  it('initializes correctly', () => {
    const state = burgerConstructorSlice.reducer(undefined, { type:'' });
    expect(state).toEqual(initialState);
  });

  it('add ingredient', () => {
    let action = { type: addIngredient.type, payload: bun };
    let state = burgerConstructorSlice.reducer(initialState, action);
    expect(state.recipe, 'bun should be added').toEqual({...initialState.recipe, wrap: bun});

    action = { type: addIngredient.type, payload: bun2 };
    state = burgerConstructorSlice.reducer(state, action);
    expect(state.recipe, 'bun should be replaced with new bun').toEqual({...state.recipe, wrap: bun2});

    action = { type: addIngredient.type, payload: stuff };
    state = burgerConstructorSlice.reducer(state, action);
    expect(state.recipe, 'stuff should be added').toEqual({...state.recipe, stuff: [stuff]});

    action = { type: addIngredient.type, payload: stuff2 };
    state = burgerConstructorSlice.reducer(state, action);
    expect(state.recipe, 'the second stuff should be added').toEqual({...state.recipe, stuff: [stuff, stuff2]});
  });

  it('delete ingredient', () => {
    const prevState = {recipe: {wrap: bun, stuff: [stuff]}};
    const action = { type: deleteIngredient.type, payload: stuff };
    const state = burgerConstructorSlice.reducer(prevState, action);
    expect(state.recipe, 'stuff should be deleted').toEqual({...prevState.recipe, stuff: []});
  });

  it('move ingredient', () => {
    const prevState = {recipe: {wrap: bun, stuff: [stuff, stuff2]}};
    const action = { type: moveIngredient.type, 
      payload: {uidFrom: '643d69a5c3f7b9001cfa093e', uidTo: '123d69a5c3f7b9001cfa093e'} };
    const state = burgerConstructorSlice.reducer(prevState, action);
    expect(state.recipe, 'stuff should be moved').toEqual({...prevState.recipe, stuff: [stuff2, stuff]});
  });
});