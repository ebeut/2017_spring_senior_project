import React from 'react';
import AppContainer from 'containers/AppContainer';
import { shallow } from 'enzyme';
import createStore from '../../src/store/createStore'


const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)
describe('App Container', () => {
  let wrap, props;
  const fn = () => {};
  beforeEach(() => {
    props = {
      store,
      routes: {}
    };
    wrap = shallow(<AppContainer {...props} />)
  });
  it('Should render all vital components for application', () => {
    expect(wrap.instance().shouldComponentUpdate()).to.be.false;
  });
});
