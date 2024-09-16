import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorElementState = {
  ingredients: Array<TConstructorIngredient>;
  bun: TConstructorIngredient | null | TIngredient;
};

export const initialState: TBurgerConstructorElementState = {
  ingredients: [],
  bun: null
};

export const burgerConstructorElementSlice = createSlice({
  name: 'burgerConstructorIngredient',
  initialState: initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },
    freeBin: () => initialState,
    moveIngredient: (state, action) => {
      const temp = state.ingredients[action.payload.index1];
      state.ingredients[action.payload.index1] =
        state.ingredients[action.payload.index2];
      state.ingredients[action.payload.index2] = temp;
    }
  },
  selectors: {
    selItem: (state) => state
  }
});

export const { selItem } = burgerConstructorElementSlice.selectors;

export const { addIngredient, removeIngredient, freeBin, moveIngredient } =
  burgerConstructorElementSlice.actions;
