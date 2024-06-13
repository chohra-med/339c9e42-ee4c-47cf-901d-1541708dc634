'use client';

import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { RecordButton } from '@/components/RecordButton';
import { useMessages } from '@/hooks/useMessages';

const MessageForm = () => {
  const t = useTranslations('InputScreen');
  const [content, setContent] = useState('');
  const { addMessage } = useMessages();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    addMessage(content);
    setContent('');
  };

  const handleOnChangeText = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setContent(e.currentTarget.value);
  };

  return (
    <form
      className="relative mx-auto max-w-3xl rounded-t-xl"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700">
        <RecordButton handleOnRecord={setContent} />
        <textarea
          id="chatAi"
          value={content}
          onChange={handleOnChangeText}
          rows={3}
          className="mx-4 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder={t('message_placeholder')}
        />

        <button
          type="submit"
          className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          aria-label="Send Message"
        >
          <PaperAirplaneIcon className="size-5" aria-hidden="true" />

          <span className="sr-only">{t('send')}</span>
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
