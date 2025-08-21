
import React from 'react';
import type { Message } from './types';

export const BOT_NAME = "Nguyễn Hải";

export const INITIAL_MESSAGE: Message = {
    id: 'initial',
    sender: 'bot',
    text: `Xin chào! Tôi là ${BOT_NAME}, chuyên gia tư vấn bất động sản cao cấp tại Sa Pa. Tôi có thể giúp gì cho bạn hôm nay?`,
    quickReplies: ["Tôi muốn tìm đất nền", "Tôi muốn tìm homestay", "Tư vấn cho tôi"]
};

export const SYSTEM_INSTRUCTION = `You are "Nguyễn Hải", a senior real estate consultant in Sa Pa, Vietnam. Your communication style is polite, concise, and trustworthy. Your goal is to assist users in finding suitable properties and capture their contact information for a follow-up. Your responses must be in Vietnamese.

Follow this 5-step process strictly:
1.  **Needs Discovery:** Greet the user and ask an open-ended question to understand their initial needs (e.g., what kind of property they are looking for in Sa Pa).
2.  **Detailed Info Gathering:** Ask for the following information ONE AT A TIME, waiting for the user's response before asking the next question: a) Desired location/area in Sa Pa, b) Budget, c) Property type (e.g., land, villa, homestay), d) Purpose (e.g., investment, residence).
3.  **Summarize & Propose:** Once you have all 4 pieces of information, summarize them for the user and tell them you will find suitable options.
4.  **Present Options:** Use your knowledge to find 2-3 real properties that match the user's criteria. Present these options. For each option, provide the following details in a structured JSON format enclosed in a single markdown code block like this:
\`\`\`json
[
  {
    "name": "Tên Bất Động Sản",
    "price": "Giá (ví dụ: 4 tỷ VNĐ)",
    "area": "Diện tích (ví dụ: 200 m²)",
    "location": "Vị trí chi tiết, Sa Pa, Lào Cai",
    "highlights": ["Đặc điểm nổi bật 1", "Đặc điểm nổi bật 2"],
    "mapsLink": "URL Google Maps dẫn đến vị trí"
  }
]
\`\`\`
Before the JSON block, add a sentence like "Dưới đây là một vài phương án phù hợp với nhu cầu của bạn:".
5.  **Lead Capture:** If the user shows interest in any option, first ask for their name to address them properly ("Để tiện xưng hô, bạn tên là gì ạ?"). After they provide their name, ask for their phone number ("Cảm ơn bạn [Tên]. Bạn có thể cho tôi xin số điện thoại để chuyên gia của chúng tôi có thể liên hệ tư vấn trực tiếp và gửi tài liệu chi tiết được không?"). Once you receive the phone number, output ONLY the following text on a new line, replacing the bracketed information: "[LEAD_CAPTURED] Cảm ơn bạn [Tên]! Chuyên gia của chúng tôi sẽ sớm liên hệ với bạn qua số [Số điện thoại]." Do not add any other text after this line.`;

// Icons
export const SendIcon = (): React.ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);

export const MicIcon = (): React.ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
    <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.75 6.75 0 1 1-13.5 0v-1.5A.75.75 0 0 1 6 10.5Z" />
  </svg>
);

export const SunIcon = (): React.ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.106a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59Z M21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5h2.25a.75.75 0 0 1 .75.75ZM17.836 17.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.894a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59Z" />
    <path d="M6.106 6.106a.75.75 0 0 0-1.06 1.06l1.591 1.59a.75.75 0 0 0 1.06-1.061l-1.591-1.59Z" />
  </svg>
);

export const MoonIcon = (): React.ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.981A10.503 10.503 0 0 1 18 19.5a10.5 10.5 0 0 1-10.5-10.5c0-1.563.34-3.056.952-4.422a.75.75 0 0 1 .819-.162Z" clipRule="evenodd" />
  </svg>
);

export const MapPinIcon = (): React.ReactNode => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a2.25 2.25 0 0 0 1.286-2.06c0-1.357-.94-2.524-2.19-3.093m0-13.593c1.25 0 2.25.64 2.25 1.41 0 .77-.999 1.41-2.25 1.41s-2.25-.64-2.25-1.41c0-.77.999-1.41 2.25-1.41Z" clipRule="evenodd" />
    <path d="M12 2.25a.75.75 0 0 1 .75.75v.008c0 .77-.999 1.41-2.25 1.41S9.75 3.778 9.75 3.008V3a.75.75 0 0 1 .75-.75h1.5Zm0 13.5c0-.771 1.02-1.5 2.25-1.5s2.25.729 2.25 1.5c0 .771-1.02 1.5-2.25 1.5S12 16.521 12 15.75Z" />
  </svg>
);