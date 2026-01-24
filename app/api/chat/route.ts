// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are AI assistant for logistics company. Provide helpful information about:
                   - Shipping prices and rates
                   - Delivery time estimates
                   - Package tracking
                   - Required documentation
                   - International shipping rules
                   - Customer support
                   Respond in Russian. Be concise and helpful.`
        },
        ...conversationHistory,
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({
      response: response.choices[0].message.content
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get response' },
      { status: 500 }
    );
  }
}