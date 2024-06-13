/* eslint-disable @typescript-eslint/consistent-type-imports */
// Use type safe message keys with `next-intl`
import { openAI } from 'open-ai';

// interface for Message AI
type Messages = typeof import('../locales/en.json');
declare interface IntlMessages extends Messages {}
interface Window {
  webkitSpeechRecognition: any;
}

type AiMessages = Parameters<
  typeof openAI.chat.completions.create
>[0]['messages'];
type AiFunctions = Parameters<
  typeof openAI.chat.completions.create
>[0]['functions'];
