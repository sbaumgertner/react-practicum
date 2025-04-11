import { BurgerConstructorActionTypes, burgerConstructorSlice } from './constructor/reducer';
import { ingredientsSlice } from './ingredients/reducer';
import { combineSlices, configureStore as createStore, ThunkDispatch } from '@reduxjs/toolkit';
import { orderSlice } from './order/reducer';
import { UserReducerActionTypes, userSlice } from './user/reducer';
import { IngredientsActionTypes } from './ingredients/actions';
import { OrderActionTypes } from './order/actions';
import { UserActionTypes } from './user/actions';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { feedSlice } from './feed/reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import {
  connect,
  disconnect,
  onConnecting,
  onOpen,
  onError,
  onMessage,
  onClose,
  FeedActionTypes
} from './feed/actions';
import {
  connect as ordersConnect,
  disconnect as ordersDisconnect,
  onConnecting as ordersOnConnecting,
  onOpen as ordersOnOpen,
  onError as ordersOnError,
  onMessage as ordersOnMessage,
  onClose as ordersOnClose,
  OrdersActionTypes
} from './orders/actions';
import { ordersSlice } from './orders/reducer';

export const reducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  orderSlice,
  userSlice,
  feedSlice,
  ordersSlice,
);

const feedMiddleware = socketMiddleware({
  connect,
  disconnect,
  onConnecting,
  onOpen,
  onError,
  onMessage,
  onClose
});

const ordersMiddlware = socketMiddleware({
  connect: ordersConnect,
  disconnect: ordersDisconnect,
  onConnecting: ordersOnConnecting,
  onOpen: ordersOnOpen,
  onError: ordersOnError,
  onMessage: ordersOnMessage,
  onClose: ordersOnClose
}, true);

export const configureStore = () => {
  return createStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(feedMiddleware, ordersMiddlware);
    }
  });
};

export type AppActions = BurgerConstructorActionTypes
  | IngredientsActionTypes
  | OrderActionTypes
  | UserActionTypes
  | UserReducerActionTypes
  | FeedActionTypes
  | OrdersActionTypes;
export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();