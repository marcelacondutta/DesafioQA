var faker = require('faker/locale/pt_BR');
var fakerBr = require('faker-br');

declare namespace Cypress {
  interface Chainable {
    generateFixtureFormularioToolsQa(): Chainable
    preencherFormulario(formulario): Chainable
    validarFormulario(): Chainable
    selecionarGrid(): Chainable
    validarGrid(): Chainable
    arrastarCard(): Chainable
  }
}

Cypress.Commands.add('preencherFormulario', (formulario) => {
    cy.get('#firstName').type(formulario.nome);
    cy.get('#lastName').type(formulario.sobrenome);
    cy.get('#userEmail').type(formulario.email);
    cy.get('#genterWrapper > .col-md-9 > :nth-child(2)').click();
    cy.get('#userNumber').type(formulario.celular);
    cy.get('#dateOfBirthInput').click();    
    cy.get('.react-datepicker__month-select').select('April');
    cy.get('.react-datepicker__year-select').select('1990');
    cy.get('.react-datepicker__day--020').click();
    cy.get('#subjectsContainer').type(formulario.assuntoComputer);
    cy.get('#react-select-2-option-0').click();
    cy.get('#subjectsContainer').type(formulario.assuntoSocial);
    cy.get('#react-select-2-option-0').click();
    cy.get('#hobbiesWrapper > .col-md-9 > :nth-child(1) > .custom-control-label').click();    
    cy.get('#currentAddress').type(formulario.endereco);
    cy.get('#state').click().type('{downarrow}{enter}');
    cy.get('#city').click().type('{downarrow}{enter}{enter}');
    
})

Cypress.Commands.add('validarFormulario', () => {
  cy.fixture('formularioToolsQa-data').then(function(formulario){
    cy.get('tbody > :nth-child(1) > :nth-child(1)').should('contain', 'Student Name');  
    cy.get('tbody > :nth-child(1) > :nth-child(2)').should('contain', formulario.dadosFormulario.nome); 
    cy.get('tbody > :nth-child(2) > :nth-child(1)').should('contain', 'Student Email');  
    cy.get('tbody > :nth-child(2) > :nth-child(2)').should('contain', formulario.dadosFormulario.email); 
    cy.get('tbody > :nth-child(3) > :nth-child(1)').should('contain', 'Gender');  
    cy.get('tbody > :nth-child(3) > :nth-child(2)').should('contain', 'Female');  
    cy.get('tbody > :nth-child(4) > :nth-child(1)').should('contain', 'Mobile'); 
    cy.get('tbody > :nth-child(4) > :nth-child(2)').should('contain', formulario.dadosFormulario.celular);
    cy.get('tbody > :nth-child(5) > :nth-child(1)').should('contain', 'Date of Birth');  
    cy.get('tbody > :nth-child(5) > :nth-child(2)').should('contain', '20 April,1990');
    cy.get('tbody > :nth-child(6) > :nth-child(1)').should('contain', 'Subjects'); 
    cy.get('tbody > :nth-child(6) > :nth-child(2)').should('contain', 'Computer Science, Social Studies');
    cy.get('tbody > :nth-child(7) > :nth-child(1)').should('contain', 'Hobbies'); 
    cy.get('tbody > :nth-child(7) > :nth-child(2)').should('contain', 'Sports');
    cy.get('tbody > :nth-child(9) > :nth-child(1)').should('contain', 'Address'); 
    cy.get('tbody > :nth-child(9) > :nth-child(2)').should('contain', formulario.dadosFormulario.endereco);
    cy.get('tbody > :nth-child(10) > :nth-child(1)').should('contain', 'State and City'); 
    cy.get('tbody > :nth-child(10) > :nth-child(2)').should('contain', 'NCR Delhi');
    cy.get('#closeLargeModal').click()
    
  })
})

Cypress.Commands.add('selecionarGrid', () => {
    cy.get(':nth-child(5) > .group-header > .header-wrapper').click();
    cy.get(':nth-child(5) > .element-list > .menu-list > #item-1 > .text').click();
    cy.get('#demo-tab-grid').click();
    cy.get('#row1 > :nth-child(1)').click();      
    cy.get('#row2 > :nth-child(2)').click();
    cy.get('#row3 > :nth-child(1)').click();
})


Cypress.Commands.add('validarGrid', () => {   
  cy.get('#row1 > :nth-child(1)').should('have.class', 'active')
  cy.get('#row2 > :nth-child(2)').should('have.class', 'active')
  cy.get('#row3 > :nth-child(1)').should('have.class', 'active')
})


Cypress.Commands.add('arrastarCard', () => {
  cy.get(':nth-child(5) > .group-header > .header-wrapper').click();
  cy.get(':nth-child(5) > .element-list > .menu-list > #item-3').click();
  cy.get('#draggable').drag('#simpleDropContainer > #droppable');
  cy.get('#draggable').trigger('mousemove');    
  cy.get('#simpleDropContainer > #droppable > p').should('contain','Dropped!')
})


Cypress.Commands.add('generateFixtureFormularioToolsQa', () => {
    const faker = require('faker')
  
    cy.writeFile('cypress/fixtures/formularioToolsQa-data.json', {
      'dadosFormulario': {
        'nome': `${faker.name.firstName()}`,
        'sobrenome': `${faker.name.lastName()}`,
        'email': `${faker.internet.email()}`,
        'celular': `${faker.phone.phoneNumber('##########')}`,     
        'assuntoComputer': 'computer science',
        'assuntoSocial': 'social studies',       
        'endereco': `${faker.address.streetName()}`
      },
    })
})