import { IngredientModel, OrderModel, OrdersListModel, UserModel } from '../model';

export type TResponse = {
  success: boolean;
}

export type TNoticeResponse = TResponse & {
  message: string;
}

export type TAuthResponse = TResponse & {
  user: UserModel;
  accessToken: string;
  refreshToken: string;
}

export type TTokenResponse = TResponse & {
  accessToken: string;
  refreshToken: string;
}

export type TUserResponse = TResponse & {
  user: UserModel;
}

export type TIngredientsResponse = TResponse & {
  data: IngredientModel[];
}

export type TOrderResponse = TResponse & {
  order: OrderModel;
}

export type TOrdersResponse = TResponse & OrdersListModel;