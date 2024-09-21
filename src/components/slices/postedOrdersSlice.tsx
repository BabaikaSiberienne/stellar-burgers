import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

type TPostedOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: null | string;
};

export const getPostOrders = createAsyncThunk('get/postedOrders', async () => {
  const orders = getOrdersApi();
  console.log(orders);
  return orders;
});

export const initialState: TPostedOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const postedOrdersSliceState = createSlice({
  name: 'postedOrders',
  initialState,
  reducers: {},
  selectors: {
    selPostedOrders: (state) => state.orders
  },
  extraReducers(builder) {
    builder
      .addCase(getPostOrders.pending, (state) => {
        state.loading = true;
        state.orders = [];
      })
      .addCase(getPostOrders.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(getPostOrders.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload;
      });
  }
});

export const { selPostedOrders } = postedOrdersSliceState.selectors;
