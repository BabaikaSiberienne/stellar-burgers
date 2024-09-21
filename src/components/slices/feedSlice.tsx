import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedSliceState = {
  loading: boolean;
  orders: TOrder[];
  feed: {
    total: number;
    totalToday: number;
  };
  error: null | string;
};

export const initialState: TFeedSliceState = {
  loading: false,
  orders: [],
  feed: {
    total: 0,
    totalToday: 0
  },
  error: null
};

export const getFeed = createAsyncThunk('get/feed', async () => {
  const feed = await getFeedsApi();
  return feed;
});
export const feedSlice = createSlice({
  name: 'feed',
  initialState: initialState,
  reducers: {},
  selectors: {
    selFeedState: (state) => state,
    selFeedOrders: (state) => state.orders,
    selFeed: (state) => state.feed
  },
  extraReducers(builder) {
    builder
      .addCase(getFeed.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(getFeed.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message as string;
      })
      .addCase(getFeed.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.orders = payload.orders;
        state.feed.total = payload.total;
        state.feed.totalToday = payload.totalToday;
      });
  }
});

export const { selFeedOrders, selFeedState, selFeed } = feedSlice.selectors;
