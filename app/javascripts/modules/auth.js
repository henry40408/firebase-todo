import 'rxjs';
import firebase from '../firebase';

// --- action types

const UPDATE_AUTHENTICATED = 'UPDATE_AUTHENTICATED';
const SIGN_IN = 'LOG_IN';
const SIGN_OUT = 'LOG_OUT';

// --- actions

export const updateAuthenticated = authenticated => ({
  type: UPDATE_AUTHENTICATED,
  authenticated,
});

export const signIn = (email, password) => ({
  type: SIGN_IN,
  email,
  password,
});

export const signOut = () => ({
  type: SIGN_OUT,
});


// --- epics

export const signInEpic = action$ => action$
  .ofType(SIGN_IN)
  .mergeMap(({ email, password }) => (
    firebase.auth().signInWithEmailAndPassword(email, password)
  ))
  .mapTo(updateAuthenticated(true))
  .catch(updateAuthenticated(false));

// --- reducers

const initialState = false;

const auth = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_AUTHENTICATED:
      return action.authenticated;
    default:
      return state;
  }
};

export default auth;
