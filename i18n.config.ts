export type Locale = (typeof locales)[number];

export const locales = ["ar", "en", "fr", "tr", "ru"] as const;
export const defaultLocale: Locale = "en";
