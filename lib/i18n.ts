import esMessages from "@/messages/es.json";
import enMessages from "@/messages/en.json";

export type Locale = "es" | "en" | "it";
export const locales: Locale[] = ["es", "en", "it"];
export const defaultLocale: Locale = "es";

type Messages = typeof esMessages;

const messagesMap: Record<string, Messages> = {
  es: esMessages,
  en: enMessages,
  it: esMessages, // fallback to es
};

export function getMessages(locale: string): Messages {
  return messagesMap[locale] ?? messagesMap.es;
}

export type TFn = (
  key: string,
  params?: Record<string, string | number>,
) => string;

export function createTranslator(messages: Messages, namespace: string): TFn {
  const ns = (messages as Record<string, Record<string, string>>)[namespace] ?? {};
  return (key, params) => {
    let value = ns[key] ?? key;
    if (params) {
      value = Object.entries(params).reduce(
        (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
        value,
      );
    }
    return value;
  };
}
