const Section1 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    SAMPLE_LITERAL: 'This is a sample literal. You can safely delete it.',
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    tableName: '[data-test="user-table"]',
    showTableButton: '[data-test="table-toggle-button"]',
    tableHeader: '[data-test="table-header"]',
    showFormButton: '[data-test="form-toggle-button"]',
    form: '[data-test="signup-form"]',
    name: 'input[id="fullName"]',
    age: 'input[id="age"]',
    gender: '[data-test="gender-select"]',
    nurseCheckBox: 'input[id="nurse"]',
    submitButton: 'button[id="submit"]',

  },

  /**
   * An action should be pretty self explanatory! It consists of all the method performing
   * a particular action from clicking a simple button to doing complex assertions.
   */
  actions: {
    /**
     * Example of action.
     * In this example, we are grabbing a sample element, clicking on it and asserting the api answer.
     *
     * This is only used as an example and can be safely deleted.
     */
    navigate () {
      cy.visit('section-1.html')
    },

    clickShowTableButton () {
      cy.get(Section1.elements.showTableButton).click()
    },

    assertTableIsNotVisible () {
      cy.get(Section1.elements.tableName).should('not.be.visible')
    },

    assertTableIsVisible () {
      cy.get(Section1.elements.tableName).should('be.visible')
    },

    assertTableColumnsLength () {
      cy.get(Section1.elements.tableHeader).find('th').should('have.length', 5)
    },

    assertTableRowsLength () {
      cy.get(Section1.elements.tableName).find('tr:not(:first)').should('have.length', 10)
    },

    assertUserRoleEntries () {
      let countRole = 0

      cy.get('th:nth-child(5)').each(($e1, index, $list) => {
        const text = $e1.text()

        if (text.includes('user')) {
          countRole = countRole + 1
        }
      }).should(() => {
        expect(countRole).to.be.at.least(5)
      })
    },

    assertPeopleCountGreaterThan60 () {
      let countAgeGT60 = 0
      let today = new Date

      today.toLocaleDateString('en-GB').split('/').join('')

      cy.get('th:nth-child(4)').each(($e1, index, $list) => {
        let birthDate = new Date($e1.text())

        let age = today.getFullYear() - birthDate.getFullYear()
        let m = today.getMonth() - birthDate.getMonth()

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--
        }

        if (age > 60) {
          countAgeGT60 = countAgeGT60 + 1
        }
      }).should(() => {
        expect(countAgeGT60).to.equal(3)
      })
    },

    assertFormIsNotVisible () {
      cy.get(Section1.elements.form).should('not.be.visible')
    },

    clickShowFormButton () {
      cy.get(Section1.elements.showFormButton).click()
    },

    assertFormIsVisible () {
      cy.get(Section1.elements.form).should('be.visible')
    },

    enterAndAssertFormData () {
      cy.get(Section1.elements.name).focus().type('Test Name')
      cy.get(Section1.elements.age).focus().type(23)
      cy.get(Section1.elements.name).should('have.value', 'Test Name')
      cy.get(Section1.elements.age).should('have.value', 23)
      cy.get(Section1.elements.gender).select('Female')
      cy.get(Section1.elements.gender).should('have.value', 'female')
      cy.get(Section1.elements.nurseCheckBox).check()
      cy.get(Section1.elements.nurseCheckBox).should('be.checked')
    },

    clickSubmitButton () {
      cy.get(Section1.elements.submitButton).click()
    },

    alertValidation () {
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Form submitted!')
      })
    },
  },
}

module.exports = { Section1 }
