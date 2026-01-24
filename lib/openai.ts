// lib/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey:'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',
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Or handle API calls via backend
});

export async function getAIResponseStream(query: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a helpful assistant for a logistics company. 
                 Provide helpful, accurate information about shipping, 
                 delivery times, pricing, and logistics services. 
                 Respond in Russian unless asked otherwise.`
      },
      {
        role: "user",
        content: query
      }
    ],
    stream: true,
    temperature: 0.7,
    max_tokens: 500
  });

  return response;
}