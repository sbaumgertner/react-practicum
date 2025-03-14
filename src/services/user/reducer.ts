import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout, register, updateUser } from './actions';
import { UserModel } from '../../model';

export type UserState = {
  user: UserModel | null;
  loading: boolean;
  error: string | null;
  isAuthChecked: boolean;
}

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
  isAuthChecked: false
};

export const userSlice = createSlice({
  name: "user",
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<UserModel | null>) => {
      state.user = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  initialState,
  selectors: {
    getUserLoading: state => state.loading,
    getUserError: state => state.error,
    getUser: state => state.user,
    getIsAuthChecked: state => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
          state.loading = true;
          state.user = null;
          state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error?.message || "Unknown error";
          state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload.user;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error?.message || "Unknown error";
          state.user = null;
      })
      .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          state.error = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Unknown error";
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Unknown error";
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
  }
});

export const {
  getUserLoading,
  getUserError,
  getUser,
  getIsAuthChecked
} = userSlice.selectors;

export const { setIsAuthChecked, setUser, resetError } = userSlice.actions;