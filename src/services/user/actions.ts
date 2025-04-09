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

export type UserActionTypes = ReturnType<typeof register.pending>
  | ReturnType<typeof register.fulfilled>
  | ReturnType<typeof register.rejected>
  | ReturnType<typeof login.pending>
  | ReturnType<typeof login.fulfilled>
  | ReturnType<typeof login.rejected>
  | ReturnType<typeof logout.pending>
  | ReturnType<typeof logout.fulfilled>
  | ReturnType<typeof logout.rejected>
  | ReturnType<typeof checkUserAuth.pending>
  | ReturnType<typeof checkUserAuth.fulfilled>
  | ReturnType<typeof checkUserAuth.rejected>
  | ReturnType<typeof updateUser.pending>
  | ReturnType<typeof updateUser.fulfilled>
  | ReturnType<typeof updateUser.rejected>;
