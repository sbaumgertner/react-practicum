import { api } from "../../utils/burger-api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken, updateTokens } from "../../utils/tokens";

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[]) => {
    const token = getAccessToken();
    let order;
    if (token) {
      try {
        order = await api.createOrder(ingredients, token);
      }
      catch {
        updateTokens();
        const newToken = getAccessToken();
        if (newToken) {
          order = await api.createOrder(ingredients, token);
        }
      }
    }
    return order;
  }
);