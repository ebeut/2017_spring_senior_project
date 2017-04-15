import React from 'react';
import { bindActionCreators } from 'redux';
import SearchPage from 'routes/Calendar/calendar';
import { shallow } from 'enzyme';


describe('Search component', () => {
  let props, spies, wrap

  beforeEach(() => {
    spies = {};
    props = {
      searchRes: {},
      calendarData: {},
      ...bindActionCreators({
        searchTVAPI: (spies.searchTVAPI = sinon.spy()),
        getShowInfo: (spies.getShowInfo = sinon.spy()),
        getTrending: (spies.getTrending = sinon.spy())
      }, spies.dispatch = sinon.spy()),
      contextTypes: {router: '/search'}
    };
    wrap = shallow(<SearchPage {...props} />)
  });
});
