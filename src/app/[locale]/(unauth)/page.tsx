import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/Container';
import Photos from '@/components/Photos';

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

export default function Index() {
  const t = useTranslations('BaseTemplate');

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            {t('title')}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {t('description')}
          </p>
        </div>
      </Container>
      <Photos />
    </>
  );
}
