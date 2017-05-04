import FavoritesRoute from 'routes/Favorites'

describe('(Route) Favorites', () => {
  let _route

  beforeEach(() => {
    _route = FavoritesRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `favorites`', () => {
    expect(_route.path).to.equal('favorites')
  })
})
