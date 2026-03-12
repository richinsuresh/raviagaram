import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'kn'],
  defaultLocale: 'en',
  localePrefix: 'always' // Ensures /en/ or /kn/ is always in the URL
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);