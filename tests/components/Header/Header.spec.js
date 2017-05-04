import React from 'react'
import { Header } from 'components/Header/Header'
import { shallow } from 'enzyme'

const spies = {}

const mkHeader = (props) => {
  let wrap = (
    shallow(<Header logout={spies.logout = sinon.spy()} userEmail={props.email} />)
  )
  return wrap;
}

describe('Header component', () => {
  it('Should render', () => {
    const wrap = mkHeader({});
    expect(wrap.find('div')).to.exist;
  });
  it('Should show correct components when logged in or out', () => {
    let wrap = mkHeader({});
    expect(wrap.find('#header-home-btn')).to.exist;
    expect(wrap.find('#header-search-btn')).to.exist;
    expect(wrap.find('#header-calender-btn')).to.not.exist;
    expect(wrap.find('#header-favorite-btn')).to.not.exist;
    expect(wrap.state().logged).to.be.false;

    wrap = mkHeader({email: 'navjot'});
    expect(wrap.find('#header-home-btn')).to.exist;
    expect(wrap.find('#header-search-btn')).to.exist;
    expect(wrap.find('#header-calendar-btn')).to.exist;
    expect(wrap.find('#header-favorite-btn')).to.exist;
    expect(wrap.state().logged).to.be.true;
  });
  it('Should have navigation with the correct behavior', () => {
    const wrap = mkHeader({});
    expect(wrap.state().open).to.be.false;
    wrap.instance().openNav();
    expect(wrap.state().open).to.be.true;
    wrap.instance().handleClickOutside();
    expect(wrap.state().open).to.be.false;
    wrap.instance().openNav();
    expect(wrap.state().open).to.be.true;
  });
});
