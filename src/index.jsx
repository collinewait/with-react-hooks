import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import * as serviceWorker from './serviceWorker';

const GET_COUNTER = 'GET_COUNTER';
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

const rootReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case GET_COUNTER: {
      return state;
    }
    case INCREMENT_COUNTER: {
      return { count: state.count + 1 };
    }
    case DECREMENT_COUNTER: {
      return { count: state.count - 1 };
    }
    default: {
      return state;
    }
  }
};

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
