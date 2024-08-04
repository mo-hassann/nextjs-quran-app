"use client";
import { VERSE_AUDIO_API_URL } from "@/constants";
import { useLocale, useTranslations } from "next-intl";
import { AVAILABLE_READERS } from "@/constants";
import CHAPTER_LIST from "@/data/chapters-list.json";
import { Locale } from "@/i18n.config";

type props = {
  chapterId?: number;
  verseId?: number;
  readerId?: string;
};

export default function useGetAudioInfo({ chapterId, readerId, verseId }: props) {
  const t = useTranslations("ChapterPage.sidebarSettings");
  const locale = useLocale() as Locale;

  if (!chapterId || !readerId || !verseId) return undefined;

  // audio src
  const apiVerseIdFormat = `${chapterId.toString().padStart(3, "0")}${verseId.toString().padStart(3, "0")}`;
  const audioSrc = `${VERSE_AUDIO_API_URL}/${readerId}/${apiVerseIdFormat}.mp3`;

  // audio title
  const readerName = AVAILABLE_READERS.find((reader) => reader.id === readerId)?.name;
  const chapter = CHAPTER_LIST.find((chapter) => chapter.id === chapterId)!;
  const chapterName = locale === "ar" ? `${chapter.name[locale]}` : `${chapter.transliterationName} (${chapter.name[locale]})`;
  const audioTitle = `${t("curVerse", { chapter: chapterName, verse: verseId })} . ${readerName && t(`Readers.${readerName}`)}`;

  // audio link
  const audioLink = `/chapter/${chapterId}/learning`;

  return { audioTitle, audioSrc, audioLink };
}
