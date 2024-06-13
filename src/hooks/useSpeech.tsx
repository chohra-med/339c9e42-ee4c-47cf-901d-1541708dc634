import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import { mapCodeCountryToSpeechLanguage } from '@/app/[locale]/(unauth)/aiChat/utils/getVoiceFromLanguage';

interface UseSpeechProps {
  isListening: boolean;
  listenToMessage: () => void;
  stopListening: () => void;
}
// This hook uses the browser's SpeechSynthesis API to read a message in the user's language
export const useSpeech = (message: string): UseSpeechProps => {
  const [isListening, setIsListening] = useState(false);
  const [activeVoice, setActiveVoice] = useState<SpeechSynthesisVoice>();

  const language = useLocale();

  const languageSpeech = mapCodeCountryToSpeechLanguage[language];

  useEffect(() => {
    let availableVoicesInbrowser = window.speechSynthesis.getVoices();
    if (
      Array.isArray(availableVoicesInbrowser) &&
      availableVoicesInbrowser.length > 0
    ) {
      const availableVoices = availableVoicesInbrowser?.filter(
        ({ lang }) => lang === languageSpeech,
      );
      const speechVoice =
        availableVoices?.find(({ name }) => name.includes('Google')) ||
        availableVoices?.find(({ name }) => name.includes('Luciana')) ||
        availableVoices?.[0];
      setActiveVoice(speechVoice);
      return;
    }
    if ('onvoiceschanged' in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = function () {
        availableVoicesInbrowser = window.speechSynthesis.getVoices();
        const availableVoices = availableVoicesInbrowser?.filter(
          ({ lang }) => lang === languageSpeech,
        );
        const speechVoice =
          availableVoices?.find(({ name }) => name.includes('Google')) ||
          availableVoices?.find(({ name }) => name.includes('Luciana')) ||
          availableVoices?.[0];
        setActiveVoice(speechVoice);
      };
    }
  }, []);

  const listenToMessage = () => {
    setIsListening(true);

    const utterance = new SpeechSynthesisUtterance(message);
    if (activeVoice) {
      utterance.voice = activeVoice;
    }
    window.speechSynthesis.speak(utterance);
    utterance.onend = () => {
      setIsListening(false);
    };
  };

  const stopListening = () => {
    if (!isListening) return;
    window.speechSynthesis.cancel();
    setIsListening(false);
  };

  return { isListening, listenToMessage, stopListening };
};
