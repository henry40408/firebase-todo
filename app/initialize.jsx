/* eslint-env browser */

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import {
  Provider,
} from 'react-redux';

import configureStore from './javascripts/configureStore';
import TodoApp from './javascripts/containers/AppContainer';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <TodoApp />
  </Provider>
);

$(document).ready(() => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
