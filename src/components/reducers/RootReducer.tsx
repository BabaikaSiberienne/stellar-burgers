import { combineSlices, createReducer } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { createAction } from '@reduxjs/toolkit';
import { useState } from 'react';
import { ingredientsSlice } from '../slices/ingredientsSlice';

export const rootReducer = combineSlices(ingredientsSlice);

// const ADD_INGREDIENT = "ADD_INGREDIENT"
// const REMOVE_INGREDIENT = "REMOVE_INGREDIENT"

// type TAddIngredientAction = {
//         payload: typeof ADD_INGREDIENT;
//     ingredient: TIngredient;
// }

// type TRemoveIngredientAction = {
//         type: typeof REMOVE_INGREDIENT;
//     _id: string;
// }

// const addIngredient = (ingredient: TIngredient): TAddIngredientAction => ({
//         type: ADD_INGREDIENT,
//     ingredient

// });

// const removeIngredient = (id: string): TRemoveIngredientAction => ({
//         type: REMOVE_INGREDIENT,
//     id

// });

// const addIngredient = createAction<TIngredient, 'ADD_INGREDIENT'>('ADD_INGREDIENT')
// const removeIngredient = createAction<string, 'REMOVE_INGREDIENT'>('REMOVE_INGREDIENT')

// const ingredientReducer = (
//     state = initialState,
//     action: TAddIngredientAction | TRemoveIngredientAction): TIngredientsState = {

//         switch (action.type) {
//             case ADD_INGREDIENT:
//                 return { ...state, ingredients: [...state.ingredients, action.ingredient]};

//             case REMOVE_INGREDIENT:
//                 return { ...state, ingredients: state.ingredients.filter(i => i.id != action.id)};

//             default:
//                 return state;

//         };
//     };

// export const ingredientReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(addIngredient, (state, action) => {
//             state.ingredients.push(action.payload);
//         })
//         builder
//         .addCase(removeIngredient, (state, action) => {
//             state.ingredients = state.ingredients.filter(i => i._id !=action._id)
//         })
// })

// const ingredientSlice = ({
//     name: 'ingredient',
//     initialState,
//     reducers: {
//         addIngredient: (state, action: TAddIngredientAction) => {
//             state.ingredients.push(action.payload);
//         },
//         removeIngredient: (state, action: TRemoveIngredientAction) => {
//             state.ingredients = state.ingredients.filter(i => i._id !=action._id)
//         }
//     }
// })

// export const { addIngredient, removeIngredient } = ingredientSlice.actions
// export const reducer = ingredientSlice.reducer;
