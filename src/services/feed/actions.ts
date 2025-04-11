import { createAction } from '@reduxjs/toolkit';
import { TOrdersResponse } from '../../utils/api-types';

export const connect = createAction<string, 'feed/onConnect'>('feed/onConnect');
export const disconnect = createAction('feed/onDisconnect');

export const onConnecting = createAction('feed/onConnecting');
export const onOpen = createAction('feed/onOpen');
export const onError = createAction<string, 'feed/onError'>('feed/onError');
export const onClose = createAction('feed/onClose');
export const onMessage = createAction<TOrdersResponse, 'feed/onMessage'>('feed/onMessage');

export type FeedActionTypes = ReturnType<typeof connect
  | typeof disconnect
  | typeof onConnecting
  | typeof onError
  | typeof onMessage
  | typeof onOpen
  | typeof onClose>;