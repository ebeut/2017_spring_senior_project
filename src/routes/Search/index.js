import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'search',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const SearchPage = require('./search-reducer').default;
      const reducer = require('./action').default;
      const cal = require('../Calendar/action').default;
      injectReducer(store, { key: 'searchRes', reducer });
      injectReducer(store, { key: 'calendarData', reducer: cal });
      cb(null, SearchPage);
    }, 'search')
  }
})
