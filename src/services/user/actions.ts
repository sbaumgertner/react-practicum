import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/burger-api';
import { LoginData, UserData } from '../../model';
import { setIsAuthChecked, setUser } from './reducer';
import { getAccessToken, removeTokens, setTokens, updateTokens } from '../../utils/tokens';
import { TAuthResponse } from '../../utils/api-types';

export const register = createAsyncThunk<TAuthResponse, UserData>(
  'user/register',
  async (data: UserData) => {
    const response = await api.register(data);
    setTokens(response);
    return response;
  }
);

export const login = createAsyncThunk<TAuthResponse, LoginData>(
  'user/login',
  async (data: LoginData) => {
    const response = await api.login(data);
    setTokens(response);
    return response;
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    const token = localStorage.getItem('refreshToken');
    if (token) {
      await api.logout(token);
      removeTokens();
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    const token = getAccessToken();
    if (token) {
      try {
        const { user } = await api.getUser(token);
        dispatch(setUser(user));
      }
      catch {
        await updateTokens();
        const newToken = getAccessToken();
        if (newToken) {
          const { user } = await api.getUser(newToken);
          dispatch(setUser(user));
        }
      }
    }
    dispatch(setIsAuthChecked(true));
  }
);

export const updateUser = createAsyncThunk<void, UserData>(
  'user/update',
  async (data: UserData, { dispatch }) => {
    const token = getAccessToken();
    if (token) {
      try {
        const { user } = await api.updateUser(data, token);
        dispatch(setUser(user));
      }
      catch {
        await updateTokens();
        const newToken = getAccessToken();
        if (newToken) {
          const { user } = await api.getUser(newToken);
          dispatch(setUser(user));
        }
      }
    }
  }
);

export type UserActionTypes = ReturnType<typeof register.pending
  | typeof register.fulfilled
  | typeof register.rejected
  | typeof login.pending
  | typeof login.fulfilled
  | typeof login.rejected
  | typeof logout.pending
  | typeof logout.fulfilled
  | typeof logout.rejected
  | typeof checkUserAuth.pending
  | typeof checkUserAuth.fulfilled
  | typeof checkUserAuth.rejected
  | typeof updateUser.pending
  | typeof updateUser.fulfilled
  | typeof updateUser.rejected>;
