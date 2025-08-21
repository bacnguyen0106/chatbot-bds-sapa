
import React from 'react';
import type { Message as MessageType } from '../types';
import RealEstateCard from './RealEstateCard';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  const messageClasses = isUser
    ? 'bg-blue-500 text-white self-end rounded-l-lg rounded-tr-lg'
    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 self-start rounded-r-lg rounded-tl-lg';
    
  if (message.isConfirmation) {
    return (
        <div className="flex justify-center">
            <div className="w-full max-w-md p-4 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-lg text-center text-green-800 dark:text-green-200">
                <h3 className="font-bold text-lg mb-2">Thông tin đã được ghi nhận!</h3>
                <p>{message.text}</p>
            </div>
        </div>
    );
  }

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full`}>
      <div className="flex items-end gap-2 max-w-full">
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            NH
          </div>
        )}
        <div className="flex flex-col gap-2 max-w-[85%]">
            {message.text && (
                 <div className={`px-4 py-3 ${messageClasses} whitespace-pre-wrap`}>
                    {message.text}
                </div>
            )}
            {message.properties && message.properties.map((prop, index) => (
                <RealEstateCard key={index} property={prop} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Message;
