import { describe, expect, it } from 'vitest';
import { feedSlice, initialState } from './reducer';
import { onClose, onConnecting, onError, onMessage, onOpen } from './actions';

describe('FeedReducerTest', () => {
  const errorState = {...initialState, error: 'Error'};

  const message = {
    success: true,
    total: 2,
    totalToday: 2,
    orders: [
      {
        _id: '67fa0f8ce8e61d001cec2074',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-04-12T07:00:28.841Z',
        updatedAt: '2025-04-12T07:00:29.623Z',
        number: 74361
      },
      {
        _id: '67fa0c9ae8e61d001cec206d',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0940',
          '643d69a5c3f7b9001cfa0949'
        ],
        status: 'done',
        name: 'Экзо-плантаго краторный space метеоритный бургер',
        createdAt: '2025-04-12T06:47:54.555Z',
        updatedAt: '2025-04-12T06:47:54.555Z',
        number: 74360
      }
    ]
  }

  it('initializes correctly', () => {
    const state = feedSlice.reducer(undefined, { type:'' });
    expect(state).toEqual(initialState);
  });

  it('onConnecting', () => {
    const state = feedSlice.reducer(errorState, {type: onConnecting.type});
    expect(state).toEqual(initialState);
  });

  it('onOpen', () => {
    const state = feedSlice.reducer(errorState, {type: onOpen.type});
    expect(state).toEqual(initialState);
  });

  it('onClose', () => {
    const state = feedSlice.reducer(errorState, {type: onClose.type});
    expect(state).toEqual(initialState);
  });

  it('onError', () => {
    const state = feedSlice.reducer(initialState, {type: onError.type, payload: 'Error'});
    expect(state).toEqual(errorState);
  });

  it('onMessage', () => {
    const state = feedSlice.reducer(initialState, {type: onMessage.type, payload: message});
    expect(state).toEqual({...initialState, ordersList: message});
  });

});