import React from 'react'
import { bindActionCreators } from 'redux'
import SearchPage from 'routes/homeTrending/home';
import { shallow } from 'enzyme'

const trending = [
  {
    "id": 1436,
    "imdbRating": 7.7,
    "poster": "http://static.tvmaze.com/uploads/images/medium_portrait/8/20717.jpg",
    "title": "The Gamez",
    "year": "2014"
  },
  {
    "id": 333,
    "imdbRating": null,
    "poster": "http://static.tvmaze.com/uploads/images/medium_portrait/2/5301.jpg",
    "title": "The Game",
    "year": "2006"
  },
  {
    "id": 16694,
    "imdbRating": 9,
    "poster": "http://static.tvmaze.com/uploads/images/medium_portrait/65/164435.jpg",
    "title": "Match Game",
    "year": "2016"
  },
  {
    "id": 3115,
    "imdbRating": null,
    "poster": "http://static.tvmaze.com/uploads/images/medium_portrait/25/64768.jpg",
    "title": "Game Shakers",
    "year": "2015"
  },
  {
    "id": 9718,
    "imdbRating": null,
    "poster": "http://static.tvmaze.com/uploads/images/medium_portrait/33/84376.jpg",
    "title": "The Rap Game",
    "year": "2016"
  },
  {
    "id": 24457,
    "imdbRating": null,
    "poster": "http://static.tvmaze.com/uploads/images/medium_portrait/97/242916.jpg",
    "title": "The Pop Game",
    "year": "2017"
  },
  {
    "id": 4292,
    "imdbRating": 10,
    "poster": "http://static.tvmaze.com/uploads/images/medium_portrait/20/51175.jpg",
    "title": "Game On!",
    "year": "1995"
  },
  {
    "id": 15703,
    "imdbRating": null,
    "poster": "http://static.tvmaze.com/uploads/images/medium_portrait/53/132588.jpg",
    "title": "Game Changers",
    "year": "2011"
  },
  {
    "id": 23647,
    "imdbRating": null,
    "poster": "http://static.tvmaze.com/uploads/images/medium_portrait/88/222083.jpg",
    "title": "Game",
    "year": "2016"
  },
  {
    "id": 11025,
    "imdbRating": 10,
    "poster": "http://static.tvmaze.com/uploads/images/medium_portrait/37/92691.jpg",
    "title": "Still Game",
    "year": "2002"
  }
];

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
  it('Should render something when loaded with no data', () => {
    expect(wrap.state().open).to.be.true;
    expect(wrap.find('#home-page')).to.exist;
    expect(wrap.find('#home-title')).to.exist;
    expect(wrap.find('#home-loading')).to.exist;
  });
  it('Should be able to handle new shows coming in', () => {
    wrap.instance().componentWillReceiveProps({calendarData: {trendingData: trending}, homeData: {}});
    expect(wrap.find('#home-loading')).to.not.exist;
    expect(wrap.find('#home-squares')).to.exist;
    wrap.instance().componentWillReceiveProps({calendarData: {}, homeData: {}});
    wrap.instance().componentWillReceiveProps({calendarData: {}, homeData: {homeData: trending}});
    expect(wrap.find('#home-loading')).to.not.exist;
    expect(wrap.find('#home-squares')).to.exist;
  });
});
