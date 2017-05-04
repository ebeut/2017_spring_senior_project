import React from 'react'
import { bindActionCreators } from 'redux'
import SearchPage from 'routes/Search/search';
import { shallow } from 'enzyme'

const searchResults = [
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

describe('Search component', () => {
  let props, spies, wrap

  beforeEach(() => {
    spies = {};
    props = {
      searchRes : {},
      calendarData: {},
      userData: {},
      ...bindActionCreators({
        searchTVAPI: (spies.searchTVAPI = sinon.spy()),
        getShowInfo: (spies.getShowInfo = sinon.spy()),
        getTrending: (spies.getTrending = sinon.spy())
      }, spies.dispatch = sinon.spy()),
      contextTypes: {router: '/search'}
    };
    wrap = shallow(<SearchPage {...props} />)
  });
  it('Should render the AutoFill search bar', () =>{
    expect(wrap.find('div')).to.exist;
    expect(wrap.find('#auto-complete-search')).to.exist;
  });
  it('Should dispatch an async action when the user clicks enter', () => {
    spies.searchTVAPI.should.have.not.been.called;
    spies.getTrending.should.have.been.called;
    wrap.instance().searchUpdated('1234');
    spies.searchTVAPI.should.have.been.called;
  });
  it('Should be able to read in data from the async call', () => {
    wrap.instance().componentWillReceiveProps({searchRes: {}, gettingSearchRes: true, calendarData: {trendingData: []} });
    wrap.instance().componentWillReceiveProps({searchRes: {searchResults}, calendarData: {trendingData: []}});
    wrap.setState({searching: true});
    expect(wrap.state().results.length).to.equal(searchResults.length);
  });
  it('Should make async call when search is ran', () => {
    expect(wrap.state().open).to.be.true;
    spies.searchTVAPI.should.not.have.been.called;
    wrap.instance().runSearch('testing');
    spies.searchTVAPI.should.have.been.called;
  })
  it('Should add trending to autofill component', () => {
    expect(wrap.state().open).to.be.true;
    wrap.instance().componentWillReceiveProps({calendarData: {trendingData: searchResults}, searchRes: {searchResults: []}});
    expect(wrap.state().open).to.be.false;
  });
});
