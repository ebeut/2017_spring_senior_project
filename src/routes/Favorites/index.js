import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'favorites',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const faveRed = require('./fav-reducer').default;
      const reducer = require('./action').default;
      const user = require('../login/action').default;
      const showInfo = require('../Show-Info/action').default;
      injectReducer(store, { key: 'showInfo', reducer: showInfo });
      injectReducer(store, { key: 'favInfo', reducer });
      injectReducer(store, { key: 'userData', reducer: user });
      cb(null, faveRed);
    }, 'favorites')
  }
})
