import React from 'react';
import { shallow } from 'enzyme';
import One from './One';


it('tests One', () => {
  const mountOne = shallow(<One />);
  const h1Tag = mountOne.find('h1');
  expect(h1Tag.length).toBe(1);
  expect(h1Tag.text()).toBe('Hey: Colline');
});
