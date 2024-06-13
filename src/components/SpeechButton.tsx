'use client';

import { MicrophoneIcon, StopCircleIcon } from '@heroicons/react/20/solid';

import { useSpeech } from '@/hooks/useSpeech';

interface SpeechButtonProps {
  message: string;
}
const SpeechButton = ({ message }: SpeechButtonProps) => {
  const { isListening, listenToMessage, stopListening } = useSpeech(message);

  return (
    <div className=" absolute inset-y-0 right-0 z-10 flex items-center pr-3">
      {isListening ? (
        <StopCircleIcon
          onClick={stopListening}
          className="size-4 rounded-full bg-white  text-red-500"
          area-hidden="True"
        />
      ) : (
        <MicrophoneIcon
          onClick={listenToMessage}
          className="size-4 text-green-500"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default SpeechButton;
