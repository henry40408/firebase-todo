/* eslint-env browser */

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Container,
  Form,
  Grid,
  Input,
  Segment,
} from 'semantic-ui-react';

const TodoApp = () => (
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

$(document).ready(() => {
  ReactDOM.render(<TodoApp />, document.getElementById('app'));
});
