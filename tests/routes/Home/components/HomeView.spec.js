import React from 'react'
import HomePage from 'routes/Home/components/Home';
import { shallow } from 'enzyme';

describe('home push component', () => {
  let wrap;

  beforeEach(() => {

    wrap = shallow(<HomePage />)
  });
  it('Should render a div', () => {
    expect(wrap.find('#home-page-push')).to.exist;
  })
});
