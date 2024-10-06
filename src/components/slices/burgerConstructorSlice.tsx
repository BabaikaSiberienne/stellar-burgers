import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TBurgerConstructorSliceState = {
  loading: boolean;
  orderRequest: boolean;
  orderModelData: TOrder | null;
  error: string | null;
};

export const initialState: TBurgerConstructorSliceState = {
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
  reducers: {
    clearOrder: (state) => {
      state.orderModelData = null;
    }
  },
  selectors: {
    selOrderModelData: (state) => state.orderModelData,
    selOrderRequest: (state) => state.orderRequest
  },
  extraReducers(builder) {
    builder
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
        state.loading = true;
        state.error = null;
        state.orderModelData = null;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.loading = false;
        state.error = 'error';
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModelData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.loading = false;
        state.error = 'error';
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModelData = action.payload.orders[0];
      });
  }
});

export const { selOrderModelData, selOrderRequest } =
  burgerConstructorSlice.selectors;

export const { clearOrder } = burgerConstructorSlice.actions;
