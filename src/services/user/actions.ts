import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/burger-api';
import { LoginData, UserData } from '../../model';
import { setIsAuthChecked, setUser } from './reducer';
import { getAccessToken, removeTokens, setTokens, TokensResponse, updateTokens } from '../../utils/tokens';

export const register = createAsyncThunk(
  'user/register',
  async (data: UserData) => {
    const response = await api.register(data);
    setTokens(response as TokensResponse);
    return response;
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (data: LoginData) => {
    const response = await api.login(data);
    setTokens(response as TokensResponse);
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
        const {user} = await api.getUser(token);
        dispatch(setUser(user));
      }
      catch {
        updateTokens();
        const newToken = getAccessToken();
        if (newToken) {
          const {user} = await api.getUser(newToken);
          dispatch(setUser(user));
        }
      }
    }
    dispatch(setIsAuthChecked(true));
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: UserData, { dispatch }) => {
    const token = getAccessToken();
    if (token) {
      try {
        const {user} = await api.updateUser(data, token);
        dispatch(setUser(user));
      }
      catch {
        updateTokens();
        const newToken = getAccessToken();
        if (newToken) {
          const {user} = await api.getUser(newToken);
          dispatch(setUser(user));
        }
      }
    }
  }
);