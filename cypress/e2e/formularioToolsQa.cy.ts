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

  it('FP - Forms - Preencher Formulário', () => {
    cy.fixture('formularioToolsQa-data').then(function (formulario) {
    cy.preencherFormulario(formulario.dadosFormulario);
    cy.validarFormulario();
  })
  })

  it('FA - Interactions - Seleção das cores no Grid', () => {
    cy.selecionarGrid();    
    cy.validarGrid()
  })

  it('FA - Interactions - Mover o Card "Drag Me"', () => {
    cy.arrastarCard();
  })
  
})