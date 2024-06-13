'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { AiMessages } from '@/types/global';

import { systemPrompt } from '../utils/prompt';
import { sendMessage } from '../utils/sendMessage';

interface ContextProps {
  messages: AiMessages[];
  addMessage: (content: string) => Promise<void>;
  isLoadingAnswer: boolean;
}

const ChatsContext = createContext<Partial<ContextProps>>({});

export function MessagesProvider({ children }: { children: ReactNode }) {
  const t = useTranslations('InputScreen');
  const [messages, setMessages] = useState<AiMessages[]>([]);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  useEffect(() => {
    const initializeChat = () => {
      const welcomeMessageText: string = t('welcome_message');
      const contentPrompt: string = systemPrompt();
      const systemMessage: AiMessages = {
        role: 'system',
        content: contentPrompt,
      };
      const welcomeMessage: AiMessages = {
        role: 'assistant',
        content: welcomeMessageText,
      };
      setMessages([systemMessage, welcomeMessage]);
    };

    // When no messages are present, we initialize the chat the system message and the welcome message
    // We hide the system message from the user in the UI
    if (!messages?.length) {
      initializeChat();
    }
  }, [messages?.length, setMessages, t]);

  const addMessage = useCallback(
    async (content: string) => {
      setIsLoadingAnswer(true);
      try {
        const newMessage: any = {
          role: 'user',
          content,
        };
        const newMessages = [...messages, newMessage];
        // Add the user message to the state so we can see it immediately
        setMessages(newMessages);

        const data = await sendMessage(newMessages);
        const reply = data.choices[0].message;
        // Add the assistant message to the state
        setMessages([...newMessages, reply]);
      } catch (error) {
        // Show error when something goes wrong
        console.log('error', error);
        console.error(error);
      } finally {
        setIsLoadingAnswer(false);
      }
    },
    [messages, setMessages, setIsLoadingAnswer],
  );

  const chatContextValues = useMemo(
    () => ({ messages, addMessage, isLoadingAnswer }),
    [messages, addMessage, isLoadingAnswer],
  );
  return (
    <ChatsContext.Provider value={chatContextValues}>
      {children}
    </ChatsContext.Provider>
  );
}

export const useMessages = () => {
  return useContext(ChatsContext) as ContextProps;
};
