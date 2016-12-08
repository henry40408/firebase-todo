import React from 'react';

import autobind from 'autobind-decorator';

import {
  Button,
  Form,
  Input,
  Message,
  Segment,
} from 'semantic-ui-react';

const errorCodeMapper = {
  'auth/user-not-found': 'Incorrect email or password',
  default: 'Unknown error',
};

const AuthFormError = ({
  code,
}) => (
  code !== '' ? (
    <Message>
      {errorCodeMapper[code] || errorCodeMapper.default}
    </Message>
  ) : (
    <span />
  )
);

AuthFormError.propTypes = {
  code: React.PropTypes.string.isRequired,
};

@autobind
class AuthForm extends React.Component {
  static propTypes = {
    authenticated: React.PropTypes.bool.isRequired,
    errorCode: React.PropTypes.string.isRequired,
    loading: React.PropTypes.bool.isRequired,
    requestSignIn: React.PropTypes.func.isRequired,
    requestSignOut: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange(name) {
    return e => this.setState({
      [name]: e.target.value,
    });
  }

  handleSignOut() {
    const {
      requestSignOut,
    } = this.props;

    this.setState({
      email: '',
      password: '',
    });

    requestSignOut();
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      requestSignIn,
    } = this.props;

    const {
      email,
      password,
    } = this.state;

    requestSignIn(email, password);
  }

  render() {
    const {
      authenticated,
      errorCode,
      loading,
    } = this.props;

    const {
      email,
      password,
    } = this.state;

    if (authenticated) {
      return (
        <Button
          basic
          onClick={this.handleSignOut}
        >{'Sign out'}</Button>
      );
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <AuthFormError code={errorCode} />
        <Segment>
          <Form.Field>
            <Input
              name={'email'}
              onChange={this.handleChange('email')}
              placeholder={'E-mail'}
              value={email}
            />
          </Form.Field>
          <Form.Field>
            <Input
              name={'password'}
              onChange={this.handleChange('password')}
              placeholder={'Password'}
              type={'password'}
              value={password}
            />
          </Form.Field>
          <Button primary loading={loading}>{'Sign in'}</Button>
        </Segment>
      </Form>
    );
  }
}

export default AuthForm;
