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

export const rootEpic = combineEpics(
  signInEpic,
  signOutEpic
);

export const rootReducer = combineReducers({
  auth,
});
