import { TIngredient } from '@utils-types';
import {
  getIngredients,
  ingredientsSlice,
  initialState
} from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const filetIngr: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  const filetIngr2: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе2',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  const mock = {
    ...initialState,
    ingredients: [filetIngr, filetIngr2]
  };

  test('getIngredients.rejected', () => {
    const typeOfAction = {
      type: getIngredients.rejected.type,
      error: {
        message: 'error message'
      }
    };

    const testCheck = {
      ...initialState,
      loading: false,
      error: 'error message'
    };
    const test = ingredientsSlice.reducer(initialState, typeOfAction);
    expect(test).toEqual(testCheck);
  });

  test('getIngredients.pending', () => {
    const typeOfAction = {
      type: getIngredients.pending.type
    };

    const testCheck = { ...initialState, loading: true, error: null };
    const test = ingredientsSlice.reducer(initialState, typeOfAction);
    expect(test).toEqual(testCheck);
  });

  test('getIngredients.fulfilled', () => {
    const typeOfAction = {
      type: getIngredients.fulfilled.type,
      payload: mock.ingredients
    };

    const testCheck = {
      ingredients: mock.ingredients,
      loading: false,
      error: null
    };
    const test = ingredientsSlice.reducer(initialState, typeOfAction);
    expect(test).toEqual(testCheck);
  });

  // test('getIngredients.rejected', () => {

  // })

  // test('getIngredients.pending', () => {

  // })

  // test('getIngredients.fulfilled', () => {

  // })
});
