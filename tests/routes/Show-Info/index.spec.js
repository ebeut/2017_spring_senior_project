import ShowInfoRoute from 'routes/Show-Info'

describe('(Route) Show Info', () => {
  let _route

  beforeEach(() => {
    _route = ShowInfoRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `showinfo`', () => {
    expect(_route.path).to.equal('showInfo')
  })
})
