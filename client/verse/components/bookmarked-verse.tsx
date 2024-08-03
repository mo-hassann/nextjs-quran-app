import { Locale } from "@/i18n.config";
import { useLocale, useTranslations } from "next-intl";
import BookmarkAction from "./verse-actions/bookmark-action";
import Link from "next/link";

type props = {
  chapterId: number;
  verseId: number;
  chapterName: Record<Locale, string>;
  transliterationChapterName: string;
};

export default function BookmarkedVerse({ chapterId, verseId, chapterName, transliterationChapterName }: props) {
  const t = useTranslations("Components.BookmarkedVerseCard");
  const locale = useLocale() as Locale;
  return (
    <div className="flex flex-col justify-between h-40 w-full bg-background hover:bg-primary-foreground hover:shadow-md hover:shadow-primary/30 transition-colors p-5 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="bg-primary/10 text-primary text-xs py-1.5 px-3 rounded-full flex items-center justify-center">{t("bookmarked")}</span>
        <BookmarkAction chapterId={chapterId} verseId={verseId} />
      </div>
      <Link href={`/chapter/${chapterId}/reading?chapter=${chapterId}&verse=${verseId}`}>
        <h2 className="text-2xl font-semibold">{locale === "ar" ? t("chapter", { name: chapterName[locale] }) : transliterationChapterName}</h2>
        {locale !== "ar" && <h3 className="text-foreground/80 font-semibold text-sm">{t("chapter", { name: chapterName[locale] })}</h3>}
        <p>{t("verseNumber", { number: verseId })}</p>
      </Link>
    </div>
  );
}
