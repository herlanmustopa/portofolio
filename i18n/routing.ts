import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['id', 'en'],

  // Used when no locale matches
  defaultLocale: 'id',

  // The prefix for locales (always show in URL)
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];
