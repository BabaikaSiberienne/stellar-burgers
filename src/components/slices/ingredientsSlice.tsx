import { getIngredientsApi } from '../../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TIngredientsState = {
  ingredients: Array<TIngredient>;
  loading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredients/getAll', async () =>
  getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  selectors: {
    selBuns: (state) =>
      state.ingredients.filter((state) => state.type == 'bun'),
    selMains: (state) =>
      state.ingredients.filter((state) => state.type == 'main'),
    selSauces: (state) =>
      state.ingredients.filter((state) => state.type == 'sauce'),
    selIngredients: (state) => state.ingredients,
    selLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { selBuns, selMains, selSauces, selIngredients, selLoading } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
// addIngredient: {
//     reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
//         state.ingredients.push(action.payload)
//     },
//     prepare: (ingredient: TIngredient) => {
//         const id = nanoid();
//     return { payload: {...ingredient, id} };
//     }
// },
// removeIngredient: (state, action: PayloadAction<string>) => {
//     state.ingredients = state.ingredients.filter(i => i._id != action.id)
// }

// export const getIngredients = createAction('GET_INGREDIENTS')
