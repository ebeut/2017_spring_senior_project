import React from 'react'
import { Header } from 'components/Header/Header'
import { shallow } from 'enzyme'

describe('Header component', () => {
  let wrap;

  beforeEach(() => {
    wrap = shallow(<Header />)
  });
  it('Should render', () => {
    expect(wrap.find('div')).to.exist;
  });
  it('Should show correct components when logged in or out', () => {
    expect(wrap.find('#header-home-btn')).to.exist;
    expect(wrap.find('#header-search-btn')).to.exist;
    expect(wrap.find('#header-calender-btn')).to.not.exist;
    expect(wrap.find('#header-settings-btn')).to.not.exist;
    let login = wrap.find('#header-app-bar').props().iconElementRight;
    expect(login.props.buttonText).to.equal('Login');

    wrap.setState({logged: true});
    login = wrap.find('#header-app-bar').props().iconElementRight;
    expect(wrap.find('#header-home-btn')).to.exist;
    expect(wrap.find('#header-search-btn')).to.exist;
    expect(wrap.find('#header-calendar-btn')).to.exist;
    expect(wrap.find('#header-settings-btn')).to.exist;
    expect(login.props.buttonText).to.equal('Sign Out');
  });
  it('Should have navigation with the correct behavior', () => {
    expect(wrap.state().open).to.be.false;
    wrap.instance().openNav();
    expect(wrap.state().open).to.be.true;
    wrap.instance().handleClickOutside();
    expect(wrap.state().open).to.be.false;
    wrap.instance().openNav();
    expect(wrap.state().open).to.be.true;
  });
});
