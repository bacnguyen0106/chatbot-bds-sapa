import { useState, useEffect, useCallback, useRef } from 'react';
import type { Message, RealEstateProperty } from '../types';
import { INITIAL_MESSAGE } from '../constants';

// A type guard to check if a message has content and is not the initial placeholder
const isMeaningfulMessage = (msg: Message): boolean => {
    return msg.id !== 'initial' && msg.text.trim().length > 0;
};


export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const isProcessingStream = useRef(false);

    useEffect(() => {
        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            setMessages(JSON.parse(savedHistory));
        } else {
            setMessages([INITIAL_MESSAGE]);
        }
    }, []);

    useEffect(() => {
        // We only save meaningful history, not the initial prompt message if it's the only one.
        if (messages.length > 1 || (messages.length === 1 && messages[0].id !== 'initial')) {
            localStorage.setItem('chatHistory', JSON.stringify(messages));
        }
    }, [messages]);

    const parseBotResponse = (text: string): Partial<Message> => {
        const leadMatch = text.match(/\[LEAD_CAPTURED\]\s*(.*)/);
        if (leadMatch && leadMatch[1]) {
            return {
                text: leadMatch[1],
                isConfirmation: true,
            };
        }

        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch && jsonMatch[1]) {
            try {
                const properties: RealEstateProperty[] = JSON.parse(jsonMatch[1]);
                const cleanedText = text.replace(jsonMatch[0], '').trim();
                return {
                    text: cleanedText,
                    properties,
                };
            } catch (error) {
                console.error('Failed to parse JSON from bot response:', error);
                return { text };
            }
        }
        
        return { text };
    };

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isProcessingStream.current) return;

        isProcessingStream.current = true;
        setIsLoading(true);

        const userMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
        
        const historyForApi = [...messages, userMessage].filter(isMeaningfulMessage).map(msg => ({
             role: msg.sender === 'user' ? 'user' : 'model',
             parts: [{ text: msg.text }],
        }));

        setMessages(prev => [...prev, userMessage]);

        const botMessageId = (Date.now() + 1).toString();
        const placeholderMessage: Message = { id: botMessageId, text: '', sender: 'bot' };
        setMessages(prev => [...prev, placeholderMessage]);
        
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ history: historyForApi }),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';

            if (reader) {
                 while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    fullResponse += chunk;
                    setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: fullResponse } : msg));
                }
            }
            
            const parsedData = parseBotResponse(fullResponse);
            setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, ...parsedData, text: parsedData.text || '' } : msg));

        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = { 
                id: botMessageId, 
                text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.", 
                sender: 'bot' 
            };
            setMessages(prev => prev.map(msg => msg.id === botMessageId ? errorMessage : msg));
        } finally {
            setIsLoading(false);
            isProcessingStream.current = false;
        }
    }, [messages]);
    
    return { messages, isLoading, sendMessage };
};