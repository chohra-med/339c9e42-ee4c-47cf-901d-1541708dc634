import SpeechButton from '@/components/SpeechButton';
import type { AiMessages } from '@/types/global';

interface MessageListItemProps {
  messages: AiMessages[];
}

const GptMessageList = ({ messages }: MessageListItemProps) => {
  return (
    <div className="mx-auto max-w-3xl pt-8">
      {messages?.map((message, i) => {
        const isUser = message.role === 'user';
        if (message.role === 'system') return null;
        return (
          <div
            id={`message-${i}`}
            className={` mb-4 flex  ${isUser ? 'justify-end' : 'justify-start'} ${
              i === 1 ? 'max-w-md' : ''
            }`}
            key={message.content}
          >
            {!isUser && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="https://www.teamsmart.ai/next-assets/team/ai.jpg"
                className="size-9 rounded-full"
                alt="avatar"
              />
            )}
            <div
              style={{ maxWidth: 'calc(100% - 45px)' }}
              className={`group relative rounded-lg bg-gray-200 px-3  pr-10  dark:bg-gray-800 ${isUser && 'bg-green-200 dark:bg-green-800'} `}
            >
              <p
                className={`text-base text-zinc-600 dark:text-zinc-400 ${isUser && ' dark:text-zinc-100'} `}
              >
                {message.content.trim()}
              </p>

              {!isUser && <SpeechButton message={message.content} />}
            </div>
            {isUser && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="https://www.teamsmart.ai/next-assets/profile-image.png"
                className="size-9 cursor-pointer rounded-full"
                alt="avatar"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GptMessageList;
