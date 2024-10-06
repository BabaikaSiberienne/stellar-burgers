import { test, expect } from '@jest/globals';
import {
  addIngredient,
  removeIngredient,
  freeBin,
  moveIngredient,
  burgerConstructorElementSlice,
  initialState
} from './burgerConstructorElementSlice';
import { useDispatch } from '../../services/store';
import { TIngredient } from '@utils-types';

describe('burgerConstructorElement', () => {
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

  const bunIngr: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  };

  const product = {
    ingredients: [
      { ...filetIngr, id: '456' },
      { ...filetIngr2, id: '457' }
    ],
    bun: { ...bunIngr, id: '123' }
  };

  test('add filet ingredient', () => {
    const add = burgerConstructorElementSlice.reducer(
      initialState,
      addIngredient(filetIngr)
    );

    expect(add.ingredients[0]).toEqual(expect.objectContaining(filetIngr));
  });

  test('add bun ingredient', () => {
    const add = burgerConstructorElementSlice.reducer(
      initialState,
      addIngredient(bunIngr)
    );
    expect(add.bun).toEqual(expect.objectContaining(bunIngr));
  });

  test('moving ingredient up', () => {
    const id = 1;
    const testState = burgerConstructorElementSlice.reducer(
      product,
      moveIngredient({ index1: id, index2: id - 1 })
    );
    expect(testState.ingredients).toEqual([
      product.ingredients[1],
      product.ingredients[0]
    ]);
  });

  test('remove ingredient', () => {
    const endState = burgerConstructorElementSlice.reducer(
      product,
      removeIngredient('456')
    );
    expect(endState.ingredients).not.toContain(filetIngr);
  });
});
