import { describe, expect, it } from 'vitest';
import { orderSlice, initialState } from './reducer';
import { createOrder, getOrder } from './actions';

describe('OrderReducerTest', () => {
  const error = {
    message: 'Ошибка 404'
  }

  const createdOrder = {
    ingredients: [
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
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0946',
        name: 'Хрустящие минеральные кольца',
        type: 'main',
        proteins: 808,
        fat: 689,
        carbohydrates: 609,
        calories: 986,
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
        __v: 0
      },
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
      }
    ],
    _id: '67fa360ce8e61d001cec210e',
    owner: {
      name: 'Светлана',
      email: 's-baumgertner@yandex.ru',
      createdAt: '2025-03-12T15:40:25.434Z',
      updatedAt: '2025-04-06T07:29:53.175Z'
    },
    status: 'done',
    name: 'Краторный бессмертный минеральный бургер',
    createdAt: '2025-04-12T09:44:44.355Z',
    updatedAt: '2025-04-12T09:44:45.046Z',
    number: 74386,
    price: 4147
  }

  const orderMessage = {
    _id: "67fa360ce8e61d001cec210e",
    ingredients: [
      "643d69a5c3f7b9001cfa093c",
      "643d69a5c3f7b9001cfa093f",
      "643d69a5c3f7b9001cfa0946",
      "643d69a5c3f7b9001cfa093c"
    ],
    owner: "67d1aae9133acd001be57502",
    status: "done",
    name: "Краторный бессмертный минеральный бургер",
    createdAt: "2025-04-12T09:44:44.355Z",
    updatedAt: "2025-04-12T09:44:45.046Z",
    number: 74386,
    __v: 0
  }

  it('initializes correctly', () => {
    const state = orderSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('createOrder.pending', () => {
    const state = orderSlice.reducer(initialState, { type: createOrder.pending.type });
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it('createOrder.rejected', () => {
    const state = orderSlice.reducer(initialState,
      { type: createOrder.rejected.type, error: error });
    expect(state).toEqual({ ...initialState, error: error.message });
  });

  it('createOrder.fulfilled', () => {
    const state = orderSlice.reducer(initialState, { type: createOrder.fulfilled.type, payload: createdOrder });
    expect(state).toEqual({ ...initialState, order: createdOrder });
  });

  it('getOrder.pending', () => {
    const state = orderSlice.reducer(initialState, { type: getOrder.pending.type });
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it('getOrder.rejected', () => {
    const state = orderSlice.reducer(initialState,
      { type: getOrder.rejected.type, error: error });
    expect(state).toEqual({ ...initialState, error: error.message });
  });

  it('getOrder.fulfilled', () => {
    const state = orderSlice.reducer(initialState, { type: getOrder.fulfilled.type, payload: orderMessage });
    expect(state).toEqual({ ...initialState, order: orderMessage });
  });

});