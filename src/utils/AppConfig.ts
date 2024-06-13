import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/shared/types';

//define the locale prefix
const localePrefix: LocalePrefix = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'Silber Salon',
  locales: ['en', 'de', 'fr'],
  defaultLocale: 'en',
  localePrefix,
};
