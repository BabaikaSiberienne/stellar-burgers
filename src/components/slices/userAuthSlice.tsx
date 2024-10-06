// const initialState: TUserState = {
//     isAuthChecked: false, // флаг для статуса проверки токена пользователя
//       isAuthenticated: false;
//     data: null,
//     loginUserError: null,
//     loginUserRequest: false,
//   };

import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserAuthSliceState = {
  loading: boolean;
  error: null | string;
  auth: boolean;
  user: TUser | null;
};

export const initialState: TUserAuthSliceState = {
  loading: false,
  error: null,
  auth: false,
  user: null
};

export const getUser = createAsyncThunk('userAuth/user', getUserApi);
export const registerUser = createAsyncThunk(
  'userAuth/getRegUser',
  (regData: TRegisterData) => registerUserApi(regData)
);

export const resetPass = createAsyncThunk(
  'userAuth/resPass',
  (userData: { password: string; token: string }) => resetPasswordApi(userData)
);

export const forgotPass = createAsyncThunk(
  'userAuth/forgotPass',
  (userData: { email: string }) => forgotPasswordApi(userData)
);

export const updUser = createAsyncThunk(
  'userAuth/updUser',
  (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const loginUser = createAsyncThunk(
  'userAuth/loginUser',
  (userData: TLoginData) => loginUserApi(userData)
);

export const logoutUser = createAsyncThunk('userAuth/logoutuser', logoutApi);

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    selUser: (state) => state.user,
    selUserState: (state) => state,
    selUserError: (state) => state.error,
    selAuthState: (state) => state.auth
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, { error }) => {
        state.loading = false;
        state.user = null;
        state.error = 'error';
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.auth = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = 'error';
        state.loading = false;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.auth = false;
        state.error = null;
        setCookie('accesToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(resetPass.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(resetPass.rejected, (state, { error }) => {
        state.error = 'error';
        state.loading = false;
      })
      .addCase(resetPass.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(forgotPass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPass.rejected, (state, { error }) => {
        state.loading = false;
        state.error = 'error';
      })
      .addCase(forgotPass.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(updUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updUser.rejected, (state, { error }) => {
        state.error = 'error';
        state.loading = false;
      })
      .addCase(updUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.error = 'error';
        state.loading = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.error = null;
        state.auth = true;
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(logoutUser.rejected, (state, { error }) => {
        state.error = 'error';
        state.loading = false;
        state.auth = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });
  }
});

export const { clearError } = userSlice.actions;
export const { selAuthState, selUser, selUserError, selUserState } =
  userSlice.selectors;
export { initialState as userState };
