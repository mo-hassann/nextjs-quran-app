import en from "./messages/en.json";

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}

export type apiSupportedLanguages = "en" | "es" | "fr" | "id" | "ru" | "sv" | "tr" | "ur" | "zh";

export type Chapter = {
  id: number;
  name: string;
  transliteration: string;
  translations?: Record<apiSupportedLanguages, string>;
  translation?: string;
  type: string;
  total_verses: number;
  verses: Verse[];
};

export type Verse = {
  id: number;
  number: number;
  text: string;
  translations?: Record<apiSupportedLanguages, string>;
  translation?: string;
  transliteration: string;
};

export type Tafseer = {
  tafseer_id: number;
  tafseer_name: string;
  ayah_number: number;
  text: string;
};
