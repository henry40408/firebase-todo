import {
  combineReducers,
} from 'redux';

import {
  combineEpics,
} from 'redux-observable';

import auth, {
  signInEpic,
} from './auth';

export const rootEpic = combineEpics(signInEpic);

export const rootReducer = combineReducers({
  auth,
});
