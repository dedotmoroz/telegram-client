import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import { userHistory } from './store';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY_KIRILL,
});

export async function openaiResponse(userIdString) {
    try {
        const response = await openai.chat.completions.create({
            messages: userHistory[userIdString],
            model: 'gpt-4o',
        });

        const botReply = response.choices[0].message.content;
        userHistory[userIdString].push({ role: 'assistant', content: botReply });
        return botReply;
    } catch (e) {
        console.error('Error OpenAI:', e);
        return null;
    }
}