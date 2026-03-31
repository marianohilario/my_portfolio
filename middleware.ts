import { NextRequest, NextResponse } from "next/server";

const locales = ["es", "en", "it"];
const defaultLocale = "es";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const languages = acceptLanguage
    .split(",")
    .map((l) => l.split(";")[0].trim().toLowerCase().substring(0, 2));

  for (const lang of languages) {
    if (locales.includes(lang)) return lang;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (hasLocale) return NextResponse.next();

  const locale = getLocale(request);
  const redirectUrl = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}`,
    request.url,
  );

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
