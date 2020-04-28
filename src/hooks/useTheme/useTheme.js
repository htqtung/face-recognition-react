import { useEffect } from 'react';

const useTheme = (selectedTheme = 'dark') => {
  useEffect(() => {
    document.documentElement.className = selectedTheme;
  }, [selectedTheme]);
};

export default useTheme;
