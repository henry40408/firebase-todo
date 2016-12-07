import React from 'react';

import {
  Button,
  Container,
  Form,
  Grid,
  Input,
  Segment,
} from 'semantic-ui-react';

import firebase from '../firebase';

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
        updateAuthenticated(true);
      } else {
        updateAuthenticated(false);
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
            <Form>
              <Segment>
                <Form.Field>
                  <Input placeholder={'E-mail'} />
                </Form.Field>
                <Form.Field>
                  <Input type={'password'} placeholder={'Password'} />
                </Form.Field>
                <Button primary>{'Login'}</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default App;
