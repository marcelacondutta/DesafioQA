/// <reference types="Cypress" />

var faker = require('faker/locale/pt_BR');

describe('FormularioToolsQa', () => {
  before(() => {
    cy.generateFixtureFormularioToolsQa()
  })

  beforeEach(() => {
    cy.visit('https://demoqa.com/automation-practice-form')
  })


  Cypress.on('uncaught:exception', (err, runnable) => {    
    return false
  })

  it('FP - Preencher Formulário', () => {
    cy.fixture('formularioToolsQa-data').then(function (formulario) {
    cy.preencherFormulario(formulario.dadosFormulario);
    cy.validarFormulario()
  })
  })
})