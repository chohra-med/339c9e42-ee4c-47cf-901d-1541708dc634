import { getTranslations } from 'next-intl/server';

import { MessagesProvider } from '@/hooks/useMessages';

import MessagesList from './components/MessageList';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function AiChat() {
  return (
    <MessagesProvider>
      <MessagesList />
    </MessagesProvider>
  );
}
