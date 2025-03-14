import { api } from "../../utils/burger-api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken, updateTokens } from "../../utils/tokens";
import { OrderModel } from "../../model";

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[]): Promise<OrderModel | undefined> => {
    const token = getAccessToken();
    if (token) {
      try {
        const {name, order: {number}} = await api.createOrder(ingredients, token);
        return {name, order: {number}}
      }
      catch {
        updateTokens();
        const newToken = getAccessToken();
        if (newToken) {
          const {name, order: {number}} = await api.createOrder(ingredients, token);
          return {name, order: {number}}
        }
      }
    }
    return undefined;
  }
);