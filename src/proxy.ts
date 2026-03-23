import { type NextRequest, NextResponse } from 'next/server';
import { i18n } from '@/lib/i18n';

const COOKIE_NAME = 'FD_LOCALE';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { languages, defaultLanguage } = i18n;

  // Check if the URL already has a locale prefix
  const pathLocale = languages.find(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`),
  );

  if (pathLocale) {
    // User is visiting a localized path — remember their choice
    const response = NextResponse.next();
    response.cookies.set(COOKIE_NAME, pathLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  // No locale in URL — redirect to saved preference or browser language
  const saved = request.cookies.get(COOKIE_NAME)?.value;
  const locale =
    saved && (languages as readonly string[]).includes(saved) ? saved : defaultLanguage;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
