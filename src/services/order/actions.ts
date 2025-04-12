import { api } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccessToken, updateTokens } from '../../utils/tokens';
import { OrderModel } from '../../model';

export const createOrder = createAsyncThunk<OrderModel | undefined, string[]>(
  'order/createOrder',
  async (ingredients: string[]): Promise<OrderModel | undefined> => {
    const token = getAccessToken();
    if (token) {
      try {
        const { order } = await api.createOrder(ingredients, token);
        return order;
      }
      catch {
        await updateTokens();
        const newToken = getAccessToken();
        if (newToken) {
          const { order } = await api.createOrder(ingredients, newToken);
          return order;
        }
      }
    }
    return undefined;
  }
);

export const getOrder = createAsyncThunk<OrderModel | undefined, number>(
  'order/getOrder',
  async (number: number): Promise<OrderModel | undefined> => {
    const { orders } = await api.getOrder(number);
    return orders.length > 0 ? orders[0] : undefined;
  }
);

export type OrderActionTypes = ReturnType<typeof createOrder.pending
  | typeof createOrder.fulfilled
  | typeof createOrder.rejected
  | typeof getOrder.pending
  | typeof getOrder.fulfilled
  | typeof getOrder.rejected>;