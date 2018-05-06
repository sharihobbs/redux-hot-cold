import React from 'react';
import { shallow } from 'enzyme';
import Game from './game';

describe('<Game />', () => {
  it('Should render without crashing', () => {
    shallow(<Game />);
  });
});
