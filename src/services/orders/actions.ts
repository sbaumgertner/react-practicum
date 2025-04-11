import { createAction } from '@reduxjs/toolkit';
import { TOrdersResponse } from '../../utils/api-types';

export const connect = createAction<string, 'orders/onConnect'>('orders/onConnect');
export const disconnect = createAction('orders/onDisconnect');

export const onConnecting = createAction('orders/onConnecting');
export const onOpen = createAction('orders/onOpen');
export const onError = createAction<string, 'orders/onError'>('orders/onError');
export const onClose = createAction('orders/onClose');
export const onMessage = createAction<TOrdersResponse, 'orders/onMessage'>('orders/onMessage');

export type OrdersActionTypes = ReturnType<typeof connect
  | typeof disconnect
  | typeof onConnecting
  | typeof onError
  | typeof onMessage
  | typeof onOpen
  | typeof onClose>;