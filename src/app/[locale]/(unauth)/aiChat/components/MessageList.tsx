'use client';

import { useMessages } from '@/hooks/useMessages';

import GptMessageList from './GptMessageList';
import LoadingAnswerComponent from './LoadingAnswerComponent';
import MessageForm from './MessageForm';

const MessagesList = () => {
  const { messages, isLoadingAnswer } = useMessages();

  return (
    <div className="mx-auto max-w-3xl pt-8">
      <div className="pb-24">
        <GptMessageList messages={messages} />

        {isLoadingAnswer && <LoadingAnswerComponent />}
      </div>
      <div className="fixed inset-x-0 bottom-4">
        <MessageForm />
      </div>
    </div>
  );
};

export default MessagesList;
