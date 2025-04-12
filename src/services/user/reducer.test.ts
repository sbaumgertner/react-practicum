import { describe, expect, it } from 'vitest';
import { userSlice, initialState, setIsAuthChecked, setUser, resetError } from './reducer';
import { login, logout, register, updateUser } from './actions';

describe('UserReducerTest', () => {
  const error = {
    message: 'Ошибка 404'
  }

  const userResp = {
    "success":true,
    "user": {
      "email":"s-baumgertner@yandex.ru",
      "name":"Светлана"
    }
  }

  it('initializes correctly', () => {
    const state = userSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('register.pending', () => {
    const state = userSlice.reducer(initialState, { type: register.pending.type });
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it('register.rejected', () => {
    const state = userSlice.reducer(initialState,
      { type: register.rejected.type, error: error });
    expect(state).toEqual({ ...initialState, error: error.message });
  });

  it('register.fulfilled', () => {
    const state = userSlice.reducer(initialState, { type: register.fulfilled.type, payload: userResp });
    expect(state).toEqual({ ...initialState, user: userResp.user });
  });

  it('login.pending', () => {
    const state = userSlice.reducer(initialState, { type: login.pending.type });
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it('login.rejected', () => {
    const state = userSlice.reducer(initialState,
      { type: login.rejected.type, error: error });
    expect(state).toEqual({ ...initialState, error: error.message });
  });

  it('login.fulfilled', () => {
    const state = userSlice.reducer(initialState, { type: login.fulfilled.type, payload: userResp });
    expect(state).toEqual({ ...initialState, user: userResp.user });
  });

  it('updateUser.pending', () => {
    const state = userSlice.reducer(initialState, { type: updateUser.pending.type });
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it('updateUser.rejected', () => {
    const state = userSlice.reducer(initialState,
      { type: updateUser.rejected.type, error: error });
    expect(state).toEqual({ ...initialState, error: error.message });
  });

  it('updateUser.fulfilled', () => {
    const prevState = { ...initialState, user: {
      "email":"s-baumgertner@yandex.ru",
      "name":"Светлана"
    }};
    const state = userSlice.reducer(prevState, { type: updateUser.fulfilled.type });
    expect(state).toEqual(prevState);
  });

  it('logout.pending', () => {
    const state = userSlice.reducer(initialState, { type: logout.pending.type });
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it('logout.rejected', () => {
    const state = userSlice.reducer(initialState,
      { type: logout.rejected.type, error: error });
    expect(state).toEqual({ ...initialState, error: error.message });
  });

  it('logout.fulfilled', () => {
    const state = userSlice.reducer(initialState, { type: logout.fulfilled.type });
    expect(state).toEqual(initialState);
  });

  it('setIsAuthChecked', () => {
    const state = userSlice.reducer(initialState, { type: setIsAuthChecked.type, payload: true });
    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });

  it('setUser', () => {
    const state = userSlice.reducer(initialState, { type: setUser.type, payload: userResp.user });
    expect(state).toEqual({ ...initialState, user: userResp.user });
  });

  it('updateUser.fulfilled', () => {
    const prevState = { ...initialState, error: 'Error'};
    const state = userSlice.reducer(prevState, { type: resetError.type });
    expect(state).toEqual(initialState);
  });

});