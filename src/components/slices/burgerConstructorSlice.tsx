import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TBurgerConstructorSliceState = {
  loading: boolean;
  orderRequest: boolean;
  orderModelData: TOrder | null;
  error: string | null;
};

const initialState: TBurgerConstructorSliceState = {
  loading: false,
  orderRequest: false,
  orderModelData: null,
  error: null
};

export const postOrder = createAsyncThunk(
  'constructor/postOrder',
  (data: string[]) => orderBurgerApi(data)
);

export const getOrder = createAsyncThunk(
  'constructor/getOrder',
  (data: number) => getOrderByNumberApi(data)
);

export const burgerConstructorSlice = createSlice({
  name: 'constructorOrderData',
  initialState: initialState,
  reducers: {},
  selectors: {
    selOrderModelData: (state) => state.orderModelData,
    selOrderRequest: (state) => state.orderRequest
  },
  extraReducers(builder) {
    builder
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
        state.loading = true;
      })
      .addCase(postOrder.rejected, (state, { error }) => {
        state.orderRequest = false;
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(postOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orderModelData = payload.order;
        state.orderRequest = false;
      })
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
      })
      .addCase(getOrder.rejected, (state, { error }) => {
        state.orderRequest = false;
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(getOrder.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orderModelData = payload.orders[0];
        state.orderRequest = true;
      });
  }
});

export const { selOrderModelData, selOrderRequest } =
  burgerConstructorSlice.selectors;
