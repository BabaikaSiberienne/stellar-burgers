describe('template spec', () => {
    beforeEach(() => {
        cy.setCookie('accessToken', 'mockToken');
        localStorage.setItem('refreshToken', 'mockToken');
        cy.fixture("user.json"); 
        cy.fixture("order.json");
        cy.intercept({ method: 'GET', url: 'api/ingredients' }, { fixture: "ingredients.json" }).as('ingredients');
        cy.intercept({ method: "GET", url: "api/auth/user" }, { fixture: "user.json" }).as("user");
        cy.intercept({ method: "POST", url: "api/orders" }, { fixture: "order.json" }).as("order");
        cy.visit('http://localhost:4000/');
    })

    it('loading mocks', () => {
        cy.wait('@ingredients');
        cy.wait('@user');
    });

    it('check add ingredient in constr', () => {
        cy.get(`[data-cy='constr']`)
            .should('not.contain.text', 'Булка');
    });

    it('check add ingredient', () => {
        cy.get(`[data-cy='ingr']`)
            .first()
            .next()
            .click({ force: true })
        cy.get(`[data-cy='constr']`)
            .should('contain.text', 'Булка');
        cy.get(`[data-cy='ingr']`)
            .last()
            .next()
            .click({ force: true })
        cy.get(`[data-cy='constr']`)
            .should('contain.text', 'Соус');
    })

    it('check open modal', () => {
        cy.get(`[data-cy='ingr']`)
            .first()
            .children()
            .first()
            .click({ force: true })
    })



    it('click on Esc', () => {
        cy.get(`[data-cy='ingr']`)
            .first()
            .children()
            .first()
            .click({ force: true })

        cy.get('body')
            .type('{esc}')
    })
    it('click on pic', () => {
        cy.get(`[data-cy='ingr']`)
            .first()
            .children()
            .first()
            .click({ force: true })

        cy.get(`[data-cy='modal']`)
            .find('button')
            .click()

        cy.get(`[data-cy='modal']`)
            .should('not.exist');
    })
    it('click on overlay', () => {
        cy.get(`[data-cy='ingr']`)
            .first()
            .children()
            .first()
            .click({ force: true })

        cy.get(`[data-cy='overlay']`)
            .click('top', { force: true })

        cy.get(`[data-cy='modal']`)
            .should('not.exist');
    })



    it('check auth', () => {
        cy.visit('http://localhost:4000/profile')
        cy.get(`[data-cy='userName']`)
            .should('have.value', 'Babaika')
        cy.get(`[data-cy='userEmail']`)
            .should('have.value', 'Babaika@yandex.ru')
    })

    it('check order', () => {
        cy.get(`[data-cy='ingr']`)
            .first()
            .next()
            .click({ force: true })
        cy.get(`[data-cy='ingr']`)
            .last()
            .next()
            .click({ force: true })
        cy.get(`[data-cy='constr']`)
            .children()
            .last()
            .find('button')
            .click()
        cy.wait('@order')

        cy.get(`[data-cy='modal']`)
            .should('exist')

        cy.get(`[data-cy='overlay']`)
            .click('top', { force: true })

        cy.get(`[data-cy='constr']`)
            .should('contain.not.text', 'Булка')
            .and('contain.not.text', 'Соус')
    })
});
