"use client";

import { createContext, useContext, useMemo } from "react";
import { getMessages, createTranslator } from "@/lib/i18n";
import type { Locale, TFn } from "@/lib/i18n";

interface LocaleCtx {
  locale: Locale;
  t: (namespace: string) => TFn;
}

const Ctx = createContext<LocaleCtx>({
  locale: "es",
  t: () => (k) => k,
});

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const messages = useMemo(() => getMessages(locale), [locale]);
  const value = useMemo<LocaleCtx>(
    () => ({ locale, t: (ns) => createTranslator(messages, ns) }),
    [locale, messages],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale(): Locale {
  return useContext(Ctx).locale;
}

export function useTranslations(namespace: string): TFn {
  const { t } = useContext(Ctx);
  return useMemo(() => t(namespace), [t, namespace]);
}
