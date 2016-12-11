import Immutable from 'immutable';
import Rx from 'rxjs';

import firebase from '../firebase';

import {
  UPDATE_AUTHENTICATED,
} from './auth';

// --- action types

const REQUEST_TODOS = 'REQUEST_TODOS';
const RECEIVE_TODOS = 'RECEIVE_TODOS';

// --- actions

const requestTodos = () => ({
  type: REQUEST_TODOS,
});

const receiveTodos = todos => ({
  type: RECEIVE_TODOS,
  todos,
});

// --- epics

export const todosAfterAuthenticationEpic = action$ => action$
  .ofType(UPDATE_AUTHENTICATED)
  .filter(action => action.authenticated)
  .mapTo(requestTodos());

export const todosEpic = (action$, store) => action$
  .ofType(REQUEST_TODOS)
  .mergeMap(() => {
    const { auth } = store.getState();
    const uid = auth.get('uid');

    const database = firebase.database();
    const orderedTodos = database.ref('todos').orderByChild('user_id');
    const todos = orderedTodos.equalTo(uid);
    return Rx.Observable.fromPromise(todos.once('value'));
  })
  .map(response => response.val())
  .map(obj => Object.keys(obj).map(k => Object.assign({}, obj[k], {
    id: k,
  })))
  .map(todos => receiveTodos(todos));

// --- reducer

const initialState = Immutable.List();

const todos = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TODOS:
      return state
        .clear()
        .merge(action.todos);
    default:
      return state;
  }
};

export default todos;
