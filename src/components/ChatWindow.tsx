
import React, { useRef, useEffect } from 'react';
import Header from './Header';
import Message from './Message';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import QuickReply from './QuickReply';
import { useChat } from '../hooks/useChat';
import type { Message as MessageType } from '../types';

interface ChatWindowProps {
    theme: string;
    toggleTheme: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ theme, toggleTheme }) => {
    const { messages, isLoading, sendMessage } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);
    
    const lastMessage = messages[messages.length - 1];
    const showQuickReplies = !isLoading && lastMessage?.sender === 'bot' && lastMessage?.quickReplies;

    return (
        <div className="w-full max-w-2xl mx-auto h-[95vh] flex flex-col bg-white dark:bg-gray-800 shadow-2xl rounded-lg">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-50 dark:bg-gray-900">
                {messages.map((msg: MessageType) => (
                    <Message key={msg.id} message={msg} />
                ))}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>
             {showQuickReplies && (
                <QuickReply replies={lastMessage.quickReplies!} onReplyClick={sendMessage} />
             )}
            <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
    );
};

export default ChatWindow;