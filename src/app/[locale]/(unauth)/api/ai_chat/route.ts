import { NextResponse } from 'next/server';

import { logger } from '@/libs/Logger';

export const POST = async (req: Request) => {
  const { messages } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;
  const url = 'https://api.openai.com/v1/chat/completions';

  const body = JSON.stringify({
    messages,
    model: 'gpt-3.5-turbo',
    stream: false,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    });
    const data = await response.json();
    logger.info('A message was sent to the AI chatbot.');

    return NextResponse.json({ data });
  } catch (error) {
    logger.error(error, 'An error occurred while posting a message');
    return NextResponse.json({}, { status: 500 });
  }
};
