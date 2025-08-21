
import React from 'react';
import { BOT_NAME, SunIcon, MoonIcon } from '../constants';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center rounded-t-lg">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg mr-3">
          {BOT_NAME.charAt(0)}
        </div>
        <div>
          <h2 className="font-semibold text-lg text-gray-900 dark:text-white">{BOT_NAME}</h2>
          <p className="text-sm text-green-500 dark:text-green-400 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
            Online
          </p>
        </div>
      </div>
      <button
        onClick={toggleTheme}
        className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
};

export default Header;
