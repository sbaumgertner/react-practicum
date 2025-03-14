import { IngredientModel, UserModel } from "../model";

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
  name: string;
  order: {
    ingredients: IngredientModel[];
    _id: string;
    owner: {
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    }
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
    price: number;
  }
}