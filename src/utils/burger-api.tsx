const INGREDIENTS_URL = 'https://norma.nomoreparties.space/api/ingredients';

const checkResponse = (res: Response) => {
  if (!res.ok) {
    throw new Error('Произошла ошибка запроса');
  }
  return res.json();
};

export const getIngredients = () => {
  return fetch(INGREDIENTS_URL).then(response => checkResponse(response));
};