import {
  connect,
} from 'react-redux';

import {
  updateAuthenticated,
} from '../modules/auth';

import App from '../components/App';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  updateAuthenticated: (authenticated, uid) => (
    dispatch(updateAuthenticated(authenticated, uid))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
