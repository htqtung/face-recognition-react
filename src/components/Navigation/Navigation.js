import React, { useState } from 'react';
import useTheme from '../../hooks/useTheme/useTheme';

const Navigation = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  useTheme(darkModeEnabled ? 'dark' : 'light');
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <label htmlFor='theme-toggler'>
        <input
          id='theme-toggler'
          type='checkbox'
          checked={darkModeEnabled}
          onChange={(e) => setDarkModeEnabled(e.target.checked)}
        />
        {'Dark Mode'}
      </label>
      <p className='f3 link dim underline pa3 pointer'>Sign Out</p>
    </nav>
  );
};

export default Navigation;
