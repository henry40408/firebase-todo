/* eslint-env browser */

import {
  createStore,
  applyMiddleware,
} from 'redux';

import {
  createEpicMiddleware,
} from 'redux-observable';

import createLogger from 'redux-logger';

import {
  rootEpic,
  rootReducer,
} from './modules/root';

const epicMiddleware = createEpicMiddleware(rootEpic);
const DEV = window.location.hostname === 'localhost';

export default function configureStore() {
  let store;

  if (DEV) {
    const logger = createLogger();
    store = createStore(rootReducer, applyMiddleware(epicMiddleware, logger));
  } else {
    store = createStore(rootReducer, applyMiddleware(epicMiddleware));
  }

  return store;
}
