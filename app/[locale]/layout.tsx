import { notFound } from "next/navigation";
import { locales, defaultLocale, getMessages, createTranslator } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { LocaleProvider } from "@/components/LocaleProvider";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = getMessages(locale);
  const t = createTranslator(messages, "hero");
  return {
    title: "Mariano Hilario - Portfolio",
    description: t("subtitle"),
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <LocaleProvider locale={locale as Locale}>
      {children}
    </LocaleProvider>
  );
}
