import React from 'react';

const Login = ({ onRouteChange }) => {
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
              />
            </div>
          </fieldset>
          <div className=''>
            <input
              className='b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib'
              type='submit'
              value='Login'
              onClick={() => onRouteChange('home')}
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
};

export default Login;
