/* eslint-env browser */

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

const TodoApp = () => (
  <div className="ui todo app container">
    <h1 className="todo app header">
      {'Todo App'}
      <small>{'on Firebase'}</small>
    </h1>
  </div>
);

$(document).ready(() => {
  ReactDOM.render(<TodoApp />, document.getElementById('app'));
});
