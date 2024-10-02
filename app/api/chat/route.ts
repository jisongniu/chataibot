import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com/v1"
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const response = await client.chat.completions.create({
      model: "deepseek-chat",
      messages: messages,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error('DeepSeek API error:', error);
    return NextResponse.json({ error: '处理请求时出错' }, { status: 500 });
  }
}