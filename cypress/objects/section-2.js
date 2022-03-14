const Section2 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {
    SAMPLE_LITERAL: 'This is a sample literal. You can safely delete it.',
    root: 'http://localhost:8889',
  },

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    sampleElement: '[data-test=sample-element-to-be-safely-deleted]',
    networkCallButton: '[data-test="network-call-button"]',
    newTabButton: '[data-test="new-tab-button"]',
    fileDownloadButton: '[data-test="file-download-button"]',
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
      cy.visit('section-2.html')
    },

    clickNetworkCallButtonAndAssertNetworkCall () {
      cy.intercept('GET', 'http://localhost:8889/todos/1').as('networkCall')
      cy.get(Section2.elements.networkCallButton).click()
      cy.wait('@networkCall')
      .its('response')
        .should('deep.include', { statusCode: 200 })
        .and('have.property', 'body')
     .then((body) => {
       expect(body).property('id').to.be.eq(1)
       expect(body).property('title').to.be.eq('Abnormally long network call!')
     })

      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Abnormally long network call!')
      })
    },

    clickNewTabButton () {
      cy.get('a').invoke('removeAttr', 'target').find(Section2.elements.newTabButton).click()
    },

    assertNewTab () {
      cy.title().should('eq', 'AlayaCare - Automation Challenge')
    },

    clickFileDownloadButton () {
      cy.get(Section2.elements.fileDownloadButton).click()
    },

    assertFileDownload () {
      cy.downloadFile('http://localhost:8080/assets/img/javascript-logo.png', 'downloads', 'javascript-logo.png')
      cy.readFile('downloads/javascript-logo.png', { timeout: 15000 }).should((buffer) => expect(buffer.length).to.be.gt(5000))
    },
  },
}

module.exports = { Section2 }
