import SearchRoute from 'routes/Search'

describe('(Route) Search', () => {
  let _route

  beforeEach(() => {
    _route = SearchRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `search`', () => {
    expect(_route.path).to.equal('search')
  })
})
