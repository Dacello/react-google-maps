import React from 'react';
import chai, {expect} from 'chai';
import {mount, shallow, render} from 'enzyme';
import Gmap from './Gmap';

describe('NotFound', () => {
  it('should render without throwing without any config', () => {
    shallow(<Gmap />);
  })
})
