import React from 'react'
import { bindActionCreators } from 'redux'
import SearchPage from 'routes/homeTrending/home';
import { shallow } from 'enzyme'

describe('Home component', () => {
  let props, spies, wrap;

  beforeEach(() => {
    spies = {};
    props = {
      showInfo: {},
      calendarData: {},
      homeData: {},
      ...bindActionCreators({
        getHomePageData: (spies.searchTVAPI = sinon.spy()),
        getShowInfo: (spies.getShowInfo = sinon.spy()),
        getTrending: (spies.getTrending = sinon.spy())
      }, spies.dispatch = sinon.spy()),
      contextTypes: {router: '/search'}
    };
    wrap = shallow(<SearchPage {...props} />)
  });
});
