import React from 'react'
import Loading from 'components/Loading/loading';
import { shallow } from 'enzyme';

describe('Loading component', () => {
  let wrap;

  beforeEach(() => {
    wrap = shallow(<Loading id="test" open={true} />)
  });
  it('Should render circular progress and title', () => {
    expect(wrap.find('CircularProgress')).to.exist;
    expect(wrap.find('h2')).to.exist;
  });
});
