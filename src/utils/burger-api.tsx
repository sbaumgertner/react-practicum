const BASE_URL = 'https://norma.nomoreparties.space/api/';
const INGREDIENTS_PATH = 'ingredients';
const ORDERS_PATH = 'orders';

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const getIngredients = () => {
  return fetch(`${BASE_URL}${INGREDIENTS_PATH}`).then(checkResponse);
};

export const createOrder = (ingredients: string[]) => {
  return fetch(`${BASE_URL}${ORDERS_PATH}`, {
      method: "POST",
      body: JSON.stringify({
          "ingredients": ingredients
      }),
      headers: {
        "Content-Type": "application/json",
      }
  }).then(checkResponse);
};

// Эндпоинт
// POST https://norma.nomoreparties.space/api/orders

// Тело запроса
//{ 
//  "ingredients": ["609646e4dc916e00276b286e","609646e4dc916e00276b2870"]
//} 