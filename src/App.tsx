
import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';

function App(): React.ReactNode {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="font-sans antialiased text-gray-800 dark:text-gray-200">
      <div className="flex flex-col h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <ChatWindow theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}

export default App;