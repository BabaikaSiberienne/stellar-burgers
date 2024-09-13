import { orderBurgerApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";

type TBurgerConstructorSliceState = {
    loading: boolean;
    orderRequest: boolean;
    orderModelData: TOrder | null;
    error: string | null;
}

const initialState: TBurgerConstructorSliceState = {
    loading: false,
    orderRequest: false,
    orderModelData: null,
    error: null
}

export const postOrder = createAsyncThunk(
    'constructor/postOrder',
    (data: string[]) => orderBurgerApi
)
export const BurgerConstructorSlice = createSlice({
    name: 'constructorOrderData',
    initialState: initialState,
    reducers: {

    }, 
    extraReducers(builder) {
        builder
        .addCase(postOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(postOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message as string;
          })
          .addCase(postOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.ingredients = action.payload;
          });
        },
})
