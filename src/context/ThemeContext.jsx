import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    // Check localStorage for user's preference
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme === 'true';
  });

  useEffect(() => {
    console.log('DDDDDDDD');
    // Apply dark class to body
    document.body.classList.toggle('dark');

    // Persist the user's preference
    localStorage.setItem('darkMode', dark);
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
