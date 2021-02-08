/// <reference types="cypress" />
describe('Blog Spot', () => {
  beforeEach(() => {
    //   //escape page error "Uncaught ReferenceError: slidesPerPage is not define"
    //   cy.on('uncaught:exception', (err, runnable) => {
    //     // returning false here prevents Cypress from
    //     // failing the test
    //     return false;
    //   });
    cy.visit('https://template2.booost.bg/01-main-demo.html');
  });

  it('should have About title in about area', () => {
    cy.get('.about-area').scrollIntoView().contains('About');
  });

  it('thumbnail image should have width 495px and hight 780px', () => {
    cy.get('.thumbnail').invoke('outerWidth').should('be.eq', 495);
    cy.get('.thumbnail').invoke('outerHeight').should('be.eq', 780);
  });

  it('should focus name input field on click in contact page form', () => {
    cy.getContactForm();
    cy.get('input[name="name"]').click().should('be.focused');
  });

  it('should focus name input field on click in contact page form', () => {
    cy.getContactForm();
    cy.get('input[name="name"]').click().should('be.focused').as('inputField');
    cy.get('input[name="email"]').click();
    cy.get('@inputField').should(`not.be.focused`);
  });

  it('should unfocus name input field when click on different input field in contact page form', () => {
    cy.getContactForm();
    cy.get('input[name="name"]').click().should('be.focused').as('inputField');
    cy.get('input[name="email"]').click();
    cy.get('@inputField').should(`not.be.focused`);
  });

  it.only('contact form should display error on submit', () => {
    cy.getContactForm();
    cy.get('input[name="name"]').type('Pesho');
    cy.get('input[name="email"]').type('Pesho@pesho.pesho');
    cy.get('input[name="subject"]').type('Pesho');
    cy.get('textarea').type('pesho...');
    cy.get('#contact-form-active > .rn-button-style--2').click().wait(1000);
    cy.get('.form-messege-active').contains(
      'Oops!An error occured and your message could not be sent.'
    );
  });
});
