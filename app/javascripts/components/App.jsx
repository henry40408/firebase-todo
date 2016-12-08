import React from 'react';

import {
  Container,
  Grid,
} from 'semantic-ui-react';

import firebase from '../firebase';
import AuthForm from '../containers/AuthFormContainer';

class App extends React.Component {
  static propTypes = {
    updateAuthenticated: React.PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {
      updateAuthenticated,
    } = this.props;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user;
        updateAuthenticated(true, uid);
      } else {
        updateAuthenticated(false, '');
      }
    });
  }

  render() {
    return (
      <Container className="todo app">
        <h1 className="todo app header">
          {'Todo App'}
          <small>{'on Firebase'}</small>
        </h1>
        <Grid centered columns={2}>
          <Grid.Column>
            <AuthForm />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default App;
