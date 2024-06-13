import type { AiMessages } from '@/types/global';

export const sendMessage = async (messages: AiMessages[]) => {
  const response = await fetch('/api/createMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  });
  const data = await response.json();
  return data;
};
