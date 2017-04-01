import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'calendar',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Calendar = require('./calendar-reducer').default;
      const reducer = require('./action').default;
      injectReducer(store, { key: 'calendar', reducer });
      cb(null, Calendar);
  }, 'calendar')
  }
})
