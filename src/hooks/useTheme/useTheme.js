import { useEffect } from 'react';

const useTheme = (selectedTheme = 'dark') => {
  useEffect(() => {
    // document.documentElement.className = selectedTheme;
    document.body.classList.toggle('dark');
  }, [selectedTheme]);
};

export default useTheme;
