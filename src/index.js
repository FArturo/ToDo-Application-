import React from 'react';
import { render } from 'react-dom';
import Main from './components/main';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Main/>
  </Provider>,
  document.getElementById('container')
);
