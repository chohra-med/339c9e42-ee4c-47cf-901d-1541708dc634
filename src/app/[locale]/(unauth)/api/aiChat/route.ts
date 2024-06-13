import { NextResponse } from 'next/server';

import { logger } from '@/libs/Logger';

export const POST = async (request: Request) => {
  const apiKey = process.env.OPENAI_API_KEY;

  const { messages } = request.body;
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
    logger.info('Posted a message to OpenAI');

    const data = await response.json();
    NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    logger.error(error, 'An error occurred while updating a guestbook');

    return NextResponse.json({}, { status: 500 });
  }
};
