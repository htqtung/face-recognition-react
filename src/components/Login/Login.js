import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: '',
      loginPassword: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ loginEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ loginPassword: event.target.value });
  };

  onSubmitLogin = () => {
    fetch('http://localhost:3000/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.loginEmail,
        password: this.state.loginPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center'>
        <div className='pa4'>
          <div className='measure'>
            <fieldset id='login' className='ba b--transparent ph0 mh0'>
              <legend className='f2 fw6 ph0 mh0'>LOGIN</legend>
              <div className='mt3'>
                <label className='db fw6 lh-copy f6' htmlFor='email-address'>
                  Email
                </label>
                <input
                  className='pa2 input-reset ba bg-transparent w-100'
                  type='email'
                  name='email-address'
                  id='email-address'
                  onChange={this.onEmailChange}
                />
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f6' htmlFor='password'>
                  Password
                </label>
                <input
                  className='b pa2 input-reset ba bg-transparent w-100'
                  type='password'
                  name='password'
                  id='password'
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className=''>
              <input
                className='b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib'
                type='submit'
                value='Login'
                onClick={() => this.onSubmitLogin()}
              />
            </div>
            <div className='lh-copy mt3'>
              <p
                className='f6 link glow db pointer'
                onClick={() => onRouteChange('register')}>
                Register
              </p>
            </div>
          </div>
        </div>
      </article>
    );
  }
}
