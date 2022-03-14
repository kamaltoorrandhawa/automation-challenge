const { Section2 } = require('../objects/section-2')

describe('API Interactions', () => {
  beforeEach(() => {
    Section2.actions.navigate()
  })

  it('Http: Waiting for network calls ', () => {
    Section2.actions.clickNetworkCallButtonAndAssertNetworkCall()
  })

  it('Browser API: Opening a new tab', () => {
    Section2.actions.clickNewTabButton()
    Section2.actions.assertNewTab()
  })

  it('Browser API: Downloading a file', () => {
    Section2.actions.clickFileDownloadButton()
    Section2.actions.assertFileDownload()
  })
})
