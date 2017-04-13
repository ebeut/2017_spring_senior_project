import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'calendar',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Calendar = require('./calendar-reducer').default;
      const reducer = require('./action').default;
      injectReducer(store, { key: 'calendarData', reducer });

      const reducerShow = require('../Show-Info/action').default;
      injectReducer(store, { key: 'showInfo', reducer: reducerShow });
      cb(null, Calendar);
  }, 'calendar')
  }
})
