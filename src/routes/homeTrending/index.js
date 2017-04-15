import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'home',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const home = require('./home-reducer').default;
      const reducer = require('./action').default;
      const showInfo = require('../Show-Info/action').default;
      const cal = require('../Calendar/action').default;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'homeData', reducer });
      injectReducer(store, { key: 'showInfo', reducer: showInfo });
      injectReducer(store, { key: 'calendarData', reducer: cal });
      /*  Return getComponent   */
      cb(null, home);

      /* Webpack named bundle   */
    }, 'home')
  }
})
