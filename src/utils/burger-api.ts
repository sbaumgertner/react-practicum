import { LoginData, UserData } from '../model';
import { TAuthResponse, TIngredientsResponse, TNoticeResponse, TOrderResponse, TTokenResponse, TUserResponse } from './api-types';

const BASE_URL = 'https://norma.nomoreparties.space/api/';
const INGREDIENTS_PATH = 'ingredients';
const ORDERS_PATH = 'orders';
const PASSWORD_RESET_REQUEST_PATH = 'password-reset';
const PASSWORD_RESET_SAVE_PATH = 'password-reset/reset';
const LOGIN_PATH = 'auth/login';
const REGISTER_PATH = 'auth/register';
const LOGOUT_PATH = 'auth/logout';
const TOKEN_PATH = 'auth/token';
const USER_PATH = 'auth/user';

export type PasswordResetData = {
  password: string;
  token: string;
}

const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  const status = res.status;
  const isJson = res.headers.get('Content-Type')?.includes('application/json');
  return  isJson ? res.json()
  .then((errorData) => 
    Promise.reject(`Ошибка ${status}. ${errorData.message || 'Неизвестная ошибка'}`)
  ) : Promise.reject(`Ошибка ${status}`);
};

const request = <T>(endPoint: string, options?: RequestInit): Promise<T> => {
  return fetch(`${BASE_URL}${endPoint}`, options).then(checkResponse<T>);
}

const getIngredients = () => {
  return request<TIngredientsResponse>(INGREDIENTS_PATH);
};

const createOrder = (ingredients: string[], token: string) => {
  return request<TOrderResponse>(ORDERS_PATH, {
      method: 'POST',
      body: JSON.stringify({
        'ingredients': ingredients
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }
  });
};

const passwordResetRequest = (email: string) => {
  return request<TNoticeResponse>(PASSWORD_RESET_REQUEST_PATH, {
    method: 'POST',
    body: JSON.stringify({
      'email': email
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

const passwordResetSave = ({password, token}: PasswordResetData) => {
  return request<TNoticeResponse>(PASSWORD_RESET_SAVE_PATH, {
    method: 'POST',
    body: JSON.stringify({
      'password': password,
      'token': token
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

const register = (data: UserData) => {
  return request<TAuthResponse>(REGISTER_PATH, {
    method: 'POST',
    body: JSON.stringify({
      'email': data.email,
      'password': data.password,
      'name': data.name
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }); 
}

const login = ({email, password}: LoginData) => {
  return request<TAuthResponse>(LOGIN_PATH, {
    method: 'POST',
    body: JSON.stringify({
      'email': email,
      'password': password
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }); 
}

const updateToken = (refreshToken: string) => {
  return request<TTokenResponse>(TOKEN_PATH, {
    method: 'POST',
    body: JSON.stringify({
      'token': refreshToken
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }); 
}

const logout = (refreshToken: string) => {
  return request<TNoticeResponse>(LOGOUT_PATH, {
    method: 'POST',
    body: JSON.stringify({
      'token': refreshToken
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

const getUser = (token: string) => {
  return request<TUserResponse>(USER_PATH, {
    method: 'GET',
    headers: {
      'Authorization': `${token}`,
      'Content-Type': 'application/json',
    }
  });
}

const updateUser = (data: UserData, token: string) => {
  return request<TUserResponse>(USER_PATH, {
    method: 'PATCH',
    body: JSON.stringify({
      'email': data.email,
      'password': data.password,
      'name': data.name
    }),
    headers: {
      'Authorization': `${token}`,
      'Content-Type': 'application/json',
    }
  }); 
}

export const api = {
  getIngredients,
  getUser,
  createOrder,
  passwordResetRequest,
  passwordResetSave,
  login,
  logout,
  register,
  updateToken,
  updateUser
};