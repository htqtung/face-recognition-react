import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import useTheme from '../../hooks/useTheme/useTheme';

const Navigation = ({ onRouteChange, isLoggedIn }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  useTheme(darkModeEnabled ? 'dark' : 'light');
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <Logo />
      <label htmlFor='theme-toggler'>
        <input
          id='theme-toggler'
          type='checkbox'
          checked={darkModeEnabled}
          onChange={(e) => setDarkModeEnabled(e.target.checked)}
        />
        {'Dark Mode'}
      </label>
      {isLoggedIn === true ? (
        <p
          className='f4 link dim underline pa3 pointer'
          onClick={() => onRouteChange('logout')}>
          Log Out
        </p>
      ) : (
        <>
          <p
            className='f4 link dim underline pa3 pointer'
            onClick={() => onRouteChange('login')}>
            Login
          </p>
          <p
            className='f4 link dim underline pa3 pointer'
            onClick={() => onRouteChange('register')}>
            Register
          </p>
        </>
      )}
    </nav>
  );
};

export default Navigation;
