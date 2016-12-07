import {
  connect,
} from 'react-redux';

import {
  updateAuthenticated,
} from '../modules/auth';

import App from '../components/App';

const mapStateToProps = state => ({
  authenticated: state.authenticated,
});

const mapDispatchToProps = dispatch => ({
  updateAuthenticated: authenticated => dispatch(updateAuthenticated(authenticated)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
