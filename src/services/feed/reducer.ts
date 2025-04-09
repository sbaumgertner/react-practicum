import { createSelector, createSlice } from '@reduxjs/toolkit';
import { OrdersListModel } from '../../model'
import { onClose, onConnecting, onError, onMessage, onOpen } from './actions';

export type FeedState = {
  ordersList: OrdersListModel;
  error: string | null;
}

export const initialState: FeedState = {
  ordersList: { orders: [], total: 0, totalToday: 0 },
  error: null,
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getOrdersList: state => state.ordersList,
    getOrderByNumber: createSelector(
      [(state): OrdersListModel => feedSlice.getSelectors().getOrdersList(state),
      (_, number) => number
      ]
      ,
      (ordersList, number) => ordersList.orders.find(order => order.number === number)
    ),
    getOrdersError: state => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(onConnecting, (state) => {
        state.error = null;
      })
      .addCase(onOpen, (state) => {
        state.error = null;
      })
      .addCase(onClose, (state) => {
        state.error = null;
      })
      .addCase(onError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(onMessage, (state, action) => {
        state.ordersList = action.payload;
        state.error = null;
      })
  }
})

export const { getOrdersList, getOrderByNumber, getOrdersError } = feedSlice.selectors;