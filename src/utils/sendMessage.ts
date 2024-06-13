import type { AiMessages } from '@/types/global';

export const sendMessage = async (messages: AiMessages[]) => {
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
    console.log({ data, body, apiKey, env: process.env });
    return data;
  } catch (error) {
    console.log(error);
  }
};
