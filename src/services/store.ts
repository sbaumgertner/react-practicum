import { burgerConstructorSlice } from "./constructor/reducer";
import {ingredientsSlice} from "./ingredients/reducer";
import {combineSlices, configureStore as createStore} from "@reduxjs/toolkit";
import { orderSlice } from "./order/reducer";
import { userSlice } from "./user/reducer";

export const reducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  orderSlice,
  userSlice
);

export const configureStore = () => {
  return createStore({
    reducer,
  });
};