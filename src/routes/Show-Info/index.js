import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'showInfo',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ShowInfo = require('./show-info-reducer').default;
      const reducer = require('./action').default;
      const user = require('../login/action').default;
      injectReducer(store, { key: 'showInfo', reducer });
      injectReducer(store, { key: 'userData', reducer: user });
      cb(null, ShowInfo);
    }, 'showInfo')
  }
})
