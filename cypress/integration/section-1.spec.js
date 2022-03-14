const { Section1 } = require('../objects/section-1')

describe('Section 1 - DOM Interactions', () => {
  beforeEach(() => {
    Section1.actions.navigate()
  })

  it('DOM: Tables', function () {
    Section1.actions.assertTableIsNotVisible()
    Section1.actions.clickShowTableButton()
    Section1.actions.assertTableIsVisible()
    Section1.actions.assertTableColumnsLength()
    Section1.actions.assertTableRowsLength()
    Section1.actions.assertUserRoleEntries()
    Section1.actions.assertPeopleCountGreaterThan60()
  })

  it('DOM: Forms', function () {
    Section1.actions.assertFormIsNotVisible()
    Section1.actions.clickShowFormButton()
    Section1.actions.assertFormIsVisible()
    Section1.actions.enterAndAssertFormData()
    Section1.actions.clickSubmitButton()
    Section1.actions.alertValidation()
  })
})
