import CalendarRoute from 'routes/Calendar'

describe('(Route) Calendar', () => {
  let _route

  beforeEach(() => {
    _route = CalendarRoute({})
  })

  it('Should return a route configuration object', () => {
    expect(typeof _route).to.equal('object')
  })

  it('Configuration should contain path `calendar`', () => {
    expect(_route.path).to.equal('calendar')
  })
})
