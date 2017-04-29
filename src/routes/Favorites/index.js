import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'favorites',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const faveRed = require('./fav-reducer').default;
      const reducer = require('./action').default;
      const user = require('../login/action').default;
      injectReducer(store, { key: 'favInfo', reducer });
      injectReducer(store, { key: 'userData', reducer: user });
      cb(null, faveRed);
    }, 'favorites')
  }
})
