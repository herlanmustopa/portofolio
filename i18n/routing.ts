import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['id', 'en'],

  // Used when no locale matches
  defaultLocale: 'id',

  // The prefix for locales - 'as-needed' avoids redirect on root path
  localePrefix: 'as-needed'
});

export type Locale = (typeof routing.locales)[number];

