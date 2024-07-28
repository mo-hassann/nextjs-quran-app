export type Chapter = {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
  verses: Verse[];
};

export type Verse = {
  id: number;
  text: string;
  translation: string;
  transliteration: string;
};
