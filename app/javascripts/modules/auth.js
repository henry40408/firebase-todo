import Rx from 'rxjs';
import Immutable from 'immutable';

import firebase from '../firebase';

// --- action types

const UPDATE_AUTHENTICATED = 'UPDATE_AUTHENTICATED';
const UPDATE_AUTH_ERROR = 'UPDATE_AUTH_ERROR';

const REQUEST_SIGN_IN = 'REQUEST_SIGN_IN';
const RECEIVE_SIGN_IN = 'RECEIVE_SIGN_IN';

const REQUEST_SIGN_OUT = 'REQUEST_SIGN_OUT';
const RECEIVE_SIGN_OUT = 'RECEIVE_SIGN_OUT';

// --- actions

const updateAuthError = (code, message) => ({
  type: UPDATE_AUTH_ERROR,
  code,
  message,
});

export const updateAuthenticated = authenticated => ({
  type: UPDATE_AUTHENTICATED,
  authenticated,
});

export const requestSignIn = (email, password) => ({
  type: REQUEST_SIGN_IN,
  email,
  password,
});

const receiveSignIn = () => ({
  type: RECEIVE_SIGN_IN,
});

export const requestSignOut = () => ({
  type: REQUEST_SIGN_OUT,
});

const receiveSignOut = () => ({
  type: RECEIVE_SIGN_OUT,
});

// --- epics

export const signInEpic = action$ => action$
  .ofType(REQUEST_SIGN_IN)
  .mergeMap(({
      email,
      password,
    }) => firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => receiveSignIn())
    .catch(({
      code,
      message,
    }) => updateAuthError(code, message)));

export const signOutEpic = action$ => action$
  .ofType(REQUEST_SIGN_OUT)
  .mergeMap(() => firebase.auth().signOut())
  .mapTo(receiveSignOut())
  .catch(({
    code,
    message,
  }) => Rx.Observable.of(updateAuthError(code, message)));

// --- reducers

const initialState = Immutable.Map({
  authenticated: false,
  error: Immutable.Map({
    code: '',
    message: '',
  }),
  loading: false,
});

const auth = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTH_ERROR:
      return state
        .set('loading', false)
        .setIn(['error', 'code'], action.code)
        .setIn(['error', 'message'], action.message);

    case UPDATE_AUTHENTICATED:
      return state
        .set('authenticated', action.authenticated);

    case REQUEST_SIGN_IN:
      return state
        .set('loading', true)
        .setIn(['error', 'code'], '')
        .setIn(['error', 'message'], '');

    case RECEIVE_SIGN_IN:
      return state
        .set('loading', false)
        .set('authenticated', true);

    case REQUEST_SIGN_OUT:
      return state
        .set('loading', true)
        .setIn(['error', 'code'], '')
        .setIn(['error', 'message'], '');

    case RECEIVE_SIGN_OUT:
      return state
        .set('authenticated', false)
        .set('loading', false);

    default:
      return state;
  }
};

export default auth;
