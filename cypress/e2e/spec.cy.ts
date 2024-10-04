describe('template spec', () => {
  beforeEach(() => {
    // cy.setCookie('accessToken', 'mockToken');
    // localStorage.setItem('refreshToken', 'mockToken');
    // cy.fixture('ingredients.json');
    // cy.intercept({method: 'GET', url: 'api/ingredients'}, { fixture:'ingredients.json'}).as('getIngredients');
    cy.visit('/http://localhost:4000/');
  })


  // it('проверка', () => {
  //   cy.wait('@getIngredients');
  //   // cy.wait('@user');

  // });

})

//добавление ингредиента из списка в конструктор
it('тест ингредиентов с сервера', () => {
  cy.get(`[data-cy='constr']`)
  // cy.get('@constr').should('contain', 'Булка')
})
