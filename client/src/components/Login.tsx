import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AUTH_TOKEN } from '../constants';
import { Mutation } from 'react-apollo';
import { MUTATION } from '../queries/Mutation';
import { AuthPayload, User } from '../types';

interface State extends User {
  login: boolean;
}

interface Data {
  login?: AuthPayload;
  signup?: AuthPayload;
}

class Login extends React.Component<RouteComponentProps, State> {
  state: State = {
    login: true,
    email: '',
    password: '',
    name: ''
  };

  _confirm = async (data: Data) => {
    const { token } = this.state.login ? data.login : data.signup;
    this._saveUserData(token);
    this.props.history.push('/');
  }

  _saveUserData = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  render() {
    const { login, email, password, name } = this.state;
    return (
      <div>
        <h4 className='mv3'>{login ? 'Login' : 'Sign Up'}</h4>
        <div className='flex flex-column'>
          {!login && (
            <input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type='text'
              placeholder='Your name'
            />
          )}
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type='text'
            placeholder='Your email address'
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type='password'
            placeholder='Choose a safe password'
          />
        </div>
        <div className='flax mt3'>
          <Mutation
            mutation={login ? MUTATION.LOGIN : MUTATION.SIGNUP}
            variables={{ email, password, name }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <div className='pointer mr2 button' onClick={() => mutation()}>
                {login ? 'login' : 'create account'}
              </div>
            )}
          </Mutation>
          <div
            className='pointer button'
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'need to create an account'
              : 'already have an account?'
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Login;