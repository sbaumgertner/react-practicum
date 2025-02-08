import { createOrder as createOrderApi } from "../../utils/burger-api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (ingredients: string[]) => {
      return createOrderApi(ingredients);
  }
);