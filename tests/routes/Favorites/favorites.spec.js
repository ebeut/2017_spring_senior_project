import React from 'react';
import { bindActionCreators } from 'redux';
import FavoritesPage from 'routes/Favorites/favorite';
import { shallow } from 'enzyme';

describe('Favorites component', () => {
  let props, spies, wrap;

  beforeEach(() => {
    spies = {};
    props = {
      favInfo: {},
      userData: {},
      showData: {},
      calendarData: {},
      ...bindActionCreators({
        addFavorite: (spies.addFavorite = sinon.spy()),
        delFavorite: (spies.delFavorite = sinon.spy()),
        getTrending: (spies.getTrending = sinon.spy()),
        getFav: (spies.getFav = sinon.spy()),
        logout: (spies.logout = sinon.spy()),
        isLogin: (spies.isLogin = sinon.spy())
      }, spies.dispatch = sinon.spy()),
      contextTypes: {router: '/search'}
    };
    wrap = shallow(<FavoritesPage {...props} />)
  })

  it('Should render its basic components', () => {
    expect(wrap.find('div')).to.exist;
  });
  it('Should dispatch actions when favorites are checked', () => {
    spies.getFav.should.have.not.been.called;
    spies.addFavorite.should.have.not.been.called;
    spies.delFavorite.should.have.not.been.called;
    wrap.instance().checkFav(0,true);
    spies.addFavorite.should.have.been.called;
    spies.delFavorite.should.have.not.been.called;
    wrap.instance().checkFav(0,false);
    spies.delFavorite.should.have.been.called;
    expect(wrap.instance().mkFavList().props.id).to.equal('fav-no-tiles');
  });
});

