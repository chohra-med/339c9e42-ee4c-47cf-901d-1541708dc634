'use client';

import { MicrophoneIcon, StopIcon } from '@heroicons/react/20/solid';
import { useRef, useState } from 'react';

interface RecordButtonProps {
  handleOnRecord: (transcript: string) => void;
}
const RecordButton = ({ handleOnRecord }: RecordButtonProps) => {
  const recognitionRef = useRef<SpeechRecognition>();

  const [isActive, setIsActive] = useState<boolean>(false);

  function onRecordPress() {
    if (isActive) {
      recognitionRef.current?.stop();
      setIsActive(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    recognitionRef.current.onstart = () => {
      setIsActive(true);
    };

    recognitionRef.current.onend = () => {
      setIsActive(false);
    };

    recognitionRef.current.onresult = async function (event: any) {
      const { transcript } = event.results[0][0];

      handleOnRecord(transcript);
    };
    recognitionRef.current.start();
  }
  const buttonClass = isActive ? 'bg-red-500' : 'bg-green-600';

  return (
    <button
      type="button"
      className={`inline-flex cursor-pointer justify-center rounded-lg p-2 text-white    ${buttonClass} `}
      onClick={onRecordPress}
    >
      {isActive ? (
        <StopIcon className="size-5" aria-hidden="true" />
      ) : (
        <MicrophoneIcon className="size-5" aria-hidden="true" />
      )}
      <span className="sr-only">Record</span>
    </button>
  );
};

export { RecordButton };
