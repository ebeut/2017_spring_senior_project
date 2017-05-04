import React from 'react'
import { bindActionCreators } from 'redux'
import { ShowSquare } from 'components/showSqr/showSqr';
import { shallow } from 'enzyme'

const searchResults = [
  {
    "id": 1436,
    "imdbRating": 7.7,
    "poster": "N/A",
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

describe('Show Square component', () => {
  let props, spies, wrap;

  beforeEach(() => {
    spies = {};
    props = {
      id: 'testing',
      content: searchResults,
      ...bindActionCreators({
        getShowInfo: (spies.getShowInfo = sinon.spy()),
      }, spies.dispatch = sinon.spy()),
    };
    wrap = shallow(<ShowSquare {...props} />)
  });
  it('Should render basics of component', () => {
    expect(wrap.find('div')).to.exist;
  });
  it('Should render tiles according to content, even when there is no image', () => {
    expect(wrap.find('img').length).to.equal(searchResults.length);
    expect(wrap.find('GridTile').length).to.equal(searchResults.length);
  });
  it('Should make the async call to get the data', () => {
    spies.getShowInfo.should.have.not.been.called;
    wrap.instance().viewShow(0);
    spies.getShowInfo.should.have.been.called;
  })
});
