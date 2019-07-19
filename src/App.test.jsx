import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import App from './App';

const mockStore = configureStore();
const store = mockStore({ count: 0 });
it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
