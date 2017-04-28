import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'login',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
     and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const home = require('./login-reducer').default;
      const reducer = require('./action').default;

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'userData', reducer });
      /*  Return getComponent   */
      cb(null, home);

      /* Webpack named bundle   */
    }, 'login')
  }
})
