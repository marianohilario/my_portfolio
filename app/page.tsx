import { headers } from "next/headers";
import { redirect } from "next/navigation";

const locales = ["es", "en", "it"];
const defaultLocale = "es";

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") ?? "";

  const lang = acceptLanguage
    .split(",")[0]
    .split(";")[0]
    .trim()
    .toLowerCase()
    .substring(0, 2);

  const locale = locales.includes(lang) ? lang : defaultLocale;

  redirect(`/${locale}`);
}
