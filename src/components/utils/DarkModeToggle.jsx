import React from 'react';
// Icons
import { IoSunny, IoMoon } from 'react-icons/io5';
// Context
import { useTheme } from '../../context/ThemeContext';

function DarkModeToggle() {
  const { dark, setDark } = useTheme();

  const darkModeHandler = () => {
    setDark(!dark);
  };

  return (
    <button onClick={darkModeHandler}>{dark ? <IoSunny /> : <IoMoon />}</button>
  );
}

export default DarkModeToggle;
