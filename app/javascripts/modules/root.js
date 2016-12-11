import {
  combineReducers,
} from 'redux';

import {
  combineEpics,
} from 'redux-observable';

import auth, {
  signInEpic,
  signOutEpic,
} from './auth';

import todos, {
  todosAfterAuthenticationEpic,
  todosEpic,
} from './todos';

export const rootEpic = combineEpics(
  signInEpic,
  signOutEpic,
  todosAfterAuthenticationEpic,
  todosEpic);

export const rootReducer = combineReducers({
  auth,
  todos,
});
