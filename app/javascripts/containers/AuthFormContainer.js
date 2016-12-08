import {
  connect,
} from 'react-redux';

import {
  requestSignIn,
  requestSignOut,
} from '../modules/auth';

import AuthForm from '../components/AuthForm';

const mapStateToProps = ({
  auth,
}) => ({
  authenticated: auth.get('authenticated'),
  errorCode: auth.getIn(['error', 'code']),
  errorMessage: auth.getIn(['error', 'message']),
  loading: auth.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  requestSignIn: (email, password) => dispatch(requestSignIn(email, password)),
  requestSignOut: () => dispatch(requestSignOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
