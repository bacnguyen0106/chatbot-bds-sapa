
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-end gap-2 max-w-full">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            NH
        </div>
        <div className="px-4 py-3 bg-gray-200 dark:bg-gray-700 rounded-r-lg rounded-tl-lg">
            <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
            </div>
        </div>
    </div>
  );
};

export default TypingIndicator;