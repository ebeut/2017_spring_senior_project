import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'search',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const SearchPage = require('./search-reducer').default;
      const reducer = require('./action').default;
      injectReducer(store, { key: 'searchRes', reducer });
      cb(null, SearchPage);
    }, 'search')
  }
})
