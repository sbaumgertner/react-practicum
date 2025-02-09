import { burgerConstructorSlice } from "./constructor/reducer";
import { ingredientDetailsSlice } from "./ingredient-details/reducer";
import {ingredientsSlice} from "./ingredients/reducer";
import {combineSlices, configureStore as createStore} from "@reduxjs/toolkit";
import { orderSlice } from "./order/reducer";

export const reducer = combineSlices(
  ingredientsSlice,
  ingredientDetailsSlice,
  burgerConstructorSlice,
  orderSlice
);

// {
//     tasks: {
//         tasks: []
//     },
//     auth: {
//         user: null
//     }
// }

export const configureStore = () => {
  return createStore({
    reducer,
    //preloadedState: initialState
  });
};