import { LoginData, UserData } from '../model';

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

const checkResponse = (res: Response) => {
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

const getIngredients = () => {
  return fetch(`${BASE_URL}${INGREDIENTS_PATH}`).then(checkResponse);
};

const createOrder = (ingredients: string[], token: string) => {
  return fetch(`${BASE_URL}${ORDERS_PATH}`, {
      method: 'POST',
      body: JSON.stringify({
        'ingredients': ingredients
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      }
  }).then(checkResponse);
};

const passwordResetRequest = (email: string) => {
  return fetch(`${BASE_URL}${PASSWORD_RESET_REQUEST_PATH}`, {
    method: 'POST',
    body: JSON.stringify({
      'email': email
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);
}

const passwordResetSave = ({password, token}: PasswordResetData) => {
  return fetch(`${BASE_URL}${PASSWORD_RESET_SAVE_PATH}`, {
    method: 'POST',
    body: JSON.stringify({
      'password': password,
      'token': token
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);
}

const register = (data: UserData) => {
  return fetch(`${BASE_URL}${REGISTER_PATH}`, {
    method: 'POST',
    body: JSON.stringify({
      'email': data.email,
      'password': data.password,
      'name': data.name
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(checkResponse); 
}

const login = ({email, password}: LoginData) => {
  return fetch(`${BASE_URL}${LOGIN_PATH}`, {
    method: 'POST',
    body: JSON.stringify({
      'email': email,
      'password': password
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(checkResponse); 
}

const updateToken = (refreshToken: string) => {
  return fetch(`${BASE_URL}${TOKEN_PATH}`, {
    method: 'POST',
    body: JSON.stringify({
      'token': refreshToken
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(checkResponse); 
}

const logout = (refreshToken: string) => {
  return fetch(`${BASE_URL}${LOGOUT_PATH}`, {
    method: 'POST',
    body: JSON.stringify({
      'token': refreshToken
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);
}

const getUser = (token: string) => {
  return fetch(`${BASE_URL}${USER_PATH}`, {
    method: 'GET',
    headers: {
      'Authorization': `${token}`,
      'Content-Type': 'application/json',
    }
  }).then(checkResponse);
}

const updateUser = (data: UserData, token: string) => {
  return fetch(`${BASE_URL}${USER_PATH}`, {
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
  }).then(checkResponse); 
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