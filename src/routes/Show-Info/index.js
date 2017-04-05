import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'showInfo',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ShowInfo = require('./show-info-reducer').default;
      const reducer = require('./action').default;
      injectReducer(store, { key: 'showInfo', reducer });
      cb(null, ShowInfo);
    }, 'showInfo')
  }
})
