import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'show-info',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ShowInfo = require('./show-info-reducer').default;
      const reducer = require('./action').default;
      injectReducer(store, { key: 'show-info', reducer });
      cb(null, ShowInfo);
    }, 'show-info')
  }
})
