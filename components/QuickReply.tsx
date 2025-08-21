
import React from 'react';

interface QuickReplyProps {
  replies: string[];
  onReplyClick: (reply: string) => void;
}

const QuickReply: React.FC<QuickReplyProps> = ({ replies, onReplyClick }) => {
  return (
    <div className="px-4 pt-2 pb-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-wrap gap-2">
        {replies.map((reply, index) => (
          <button
            key={index}
            onClick={() => onReplyClick(reply)}
            className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 border border-blue-300 dark:border-blue-700 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickReply;
