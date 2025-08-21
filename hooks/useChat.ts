
import { useState, useEffect, useCallback, useRef } from 'react';
import type { Message, RealEstateProperty } from '../types';
import { INITIAL_MESSAGE } from '../constants';
import { sendMessageStream } from '../services/geminiService';

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
        if (messages.length > 0) {
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
        setMessages(prev => [...prev, userMessage]);

        const botMessageId = (Date.now() + 1).toString();
        const placeholderMessage: Message = { id: botMessageId, text: '', sender: 'bot' };
        setMessages(prev => [...prev, placeholderMessage]);
        
        try {
            let fullResponse = '';
            const stream = sendMessageStream(text);
            for await (const chunk of stream) {
                fullResponse += chunk;
                setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, text: fullResponse } : msg));
            }
            
            const parsedData = parseBotResponse(fullResponse);
            setMessages(prev => prev.map(msg => msg.id === botMessageId ? { ...msg, ...parsedData } : msg));

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
    }, []);
    
    return { messages, isLoading, sendMessage };
};
