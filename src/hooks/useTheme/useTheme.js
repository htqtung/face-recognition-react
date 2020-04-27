import { useEffect } from 'react';

const useTheme = (selectedTheme) => {
  useEffect(() => {
    document.documentElement.className = selectedTheme;
  }, [selectedTheme]);
};

export default useTheme;
