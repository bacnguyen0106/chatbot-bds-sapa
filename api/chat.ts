import { GoogleGenAI, Chat, Content } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

export const config = {
  runtime: 'edge',
};

// Vercel auto-populates process.env from project environment variables
const apiKey = process.env.API_KEY;

if (!apiKey) {
    throw new Error("API_KEY environment variable not set in Vercel project settings");
}

const ai = new GoogleGenAI({ apiKey });

const model = 'gemini-2.5-flash';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { history } = await req.json();
    const lastUserMessage = history.pop();

    if (!lastUserMessage || lastUserMessage.role !== 'user') {
        return new Response(JSON.stringify({ error: 'No user message found' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const chat: Chat = ai.chats.create({
        model: model,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history as Content[],
    });

    const result = await chat.sendMessageStream({ message: lastUserMessage.parts[0].text });

    const stream = new ReadableStream({
        async start(controller) {
            for await (const chunk of result) {
                controller.enqueue(new TextEncoder().encode(chunk.text));
            }
            controller.close();
        }
    });

    return new Response(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error) {
    console.error('Error in chat handler:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}