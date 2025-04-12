import type {} from 'cypress';
import ingredientsData from '../fixtures/ingredients.json';
import orderData from '../fixtures/order.json';

describe('BurgerConstructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user'});
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients'});
    cy.intercept('POST', '/api/orders', { fixture: 'order'}).as('orderPost');
    cy.visit('http://localhost:5173/');
    window.localStorage.setItem('accessToken', JSON.stringify('TestAccessToken'));
    window.localStorage.setItem('refreshToken', JSON.stringify('TestRefreshToken'));
  });

  it('drag ingredients into constructor', () => {
    const ingredients = ingredientsData.data;
    const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
    const sauce = ingredients.find(ingredient => ingredient.type === 'sauce')!;
    const main = ingredients.find(ingredient => ingredient.type === 'main')!;

    cy.get('[data-testid="burger-constructor"]').as('constructor');

    cy.get(`[data-testid="${buns[0]._id}"]`).trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@constructor').find('.constructor-element_pos_top').should('contain.text', buns[0].name);
    cy.get('@constructor').find('.constructor-element_pos_bottom').should('contain.text', buns[0].name);

    cy.get(`[data-testid="${buns[1]._id}"]`).trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@constructor').find('.constructor-element_pos_top').should('contain.text', buns[1].name);
    cy.get('@constructor').find('.constructor-element_pos_bottom').should('contain.text', buns[1].name);
    cy.get('@constructor').should('not.contain.text', buns[0].name);

    cy.get(`[data-testid="${sauce._id}"]`).trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get(`[data-testid="${main._id}"]`).trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@constructor').find('.constructor-element').should('contain.text', sauce.name);
    cy.get('@constructor').find('.constructor-element').should('contain.text', main.name);
  });

  it('open and close ingredient details modal', () => {
    const ingredient = ingredientsData.data[0];

    cy.get(`[data-testid="${ingredient._id}"]`).click();
    cy.get('[data-testid="modal"]').should('exist').as('modal');

    cy.get('@modal').should('contain.text', ingredient.name);
    cy.get('@modal').should('contain.text', ingredient.proteins);
    cy.get('@modal').should('contain.text', ingredient.fat);
    cy.get('@modal').should('contain.text', ingredient.carbohydrates);
    cy.get('@modal').should('contain.text', ingredient.calories);
    cy.get('@modal').find('img').should('have.attr', 'src', ingredient.image_large);

    cy.get('[data-testid="modal-header"]').find('svg').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    cy.get(`[data-testid="${ingredient._id}"]`).click();
    cy.get('[data-testid="modal-overlay"]').click({force: true});
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('create order', () => {
    const ingredients = ingredientsData.data;
    const bun = ingredients.find(ingredient => ingredient.type === 'bun')!;
    const sauce = ingredients.find(ingredient => ingredient.type === 'sauce')!;
    const main = ingredients.find(ingredient => ingredient.type === 'main')!;

    cy.get('[data-testid="burger-constructor"]').as('constructor');
    cy.get(`[data-testid="${bun._id}"]`).trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get(`[data-testid="${sauce._id}"]`).trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get(`[data-testid="${main._id}"]`).trigger('dragstart');
    cy.get('@constructor').trigger('drop');

    cy.get('[data-testid="create-order"]').find('.button').click();
    cy.wait('@orderPost').then(() => {
      cy.get('[data-testid="modal"]').should('exist').as('modal');
      cy.get('@modal').should('contain.text', orderData.order.number);
    });
  });
});