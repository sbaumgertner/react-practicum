import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./actions";

type OrderModel = {
  name: string;
  order: {number: number};
  success: boolean;
}

export type OrderState = {
  order?: OrderModel;
  loading: boolean;
  error?: string;
}

const initialState: OrderState = {
  loading: false,
};

export const orderSlice = createSlice({
  name: "order",
  reducers: {},
  initialState,
  selectors: {
    getOrderLoading: state => state.loading,
    getOrderError: state => state.error,
    getOrderNumber:  state => state.order?.order.number,
  },
  extraReducers: (builder) => {
      builder
          .addCase(createOrder.pending, (state) => {
              state.loading = true;
              state.order = undefined;
          })
          .addCase(createOrder.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error?.message || "Unknown error";
              state.order = undefined;
          })
          .addCase(createOrder.fulfilled, (state, action) => {
              state.loading = false;
              state.order = action.payload;
          })
  }
});

export const {
  getOrderLoading,
  getOrderError,
  getOrderNumber
} = orderSlice.selectors;