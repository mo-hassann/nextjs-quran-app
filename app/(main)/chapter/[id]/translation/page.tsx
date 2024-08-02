"use client";
import Spinner from "@/components/spinner";
import VerseCard from "@/client/verse/components/verse-card";
import useGetBookmarkVersesIds from "@/client/verse/api/use-get-bookmarks-verses-ids";
import useGetChapter from "@/client/chapter/api/use-get-chapter";
import useScrollToCurVerse from "@/hooks/use-scroll-to-element";
import BsmAllah from "@/client/chapter/components/bsm-allah";
import useScrollToElement from "@/hooks/use-scroll-to-element";
import { useFontsize } from "@/client/chapter/hooks/use-fontsize";
import useCurVerseId from "@/client/verse/hooks/use-cur-verse-id";
import useUpdateSearchParams from "@/hooks/use-update-search-params";

type props = {
  params: { id: string };
};

export default function TranslationPage({ params: { id: curChapterId } }: props) {
  const chapterQuery = useGetChapter(curChapterId);

  const bookmarkedVerseQuery = useGetBookmarkVersesIds();
  const curVerseId = useCurVerseId();

  const { fontsize } = useFontsize();

  const { searchParams } = useUpdateSearchParams();
  const search = (searchParams.get("search") || "").toLocaleLowerCase().replace(/[\u064B-\u065F]/g, "");

  const isError = chapterQuery.isError || bookmarkedVerseQuery.isError;
  const isLoading = chapterQuery.isLoading || chapterQuery.isPending || bookmarkedVerseQuery.isLoading || bookmarkedVerseQuery.isPending;

  useScrollToElement(curVerseId, [chapterQuery]);

  if (isError) return "error";
  if (isLoading) return <Spinner />;

  const searchFilterVerses = chapterQuery.data.verses.filter((verse) => verse.text.replace(/[\u064B-\u065F]/g, "").includes(search) || verse.translation.toLocaleLowerCase().includes(search) || verse.transliteration.toLocaleLowerCase().includes(search));

  if (searchFilterVerses.length === 0) return <p>no data.</p>;

  return (
    <div className="flex flex-col gap-2">
      {/* omit Al-Fatihah and At-Tawbah ادراج "بسم الله الرحمن الرحيم" في جميع السور ماعدا سورة الفاتحة والتوبة */}
      {![1, 9].includes(+curChapterId) && <BsmAllah className="w-auto" style={{ height: `${3.5 * fontsize}rem` }} />}
      {searchFilterVerses.map((verse) => {
        const isBookmarked = bookmarkedVerseQuery.data.filter(({ chapterId }) => chapterId === +curChapterId).some(({ verseId }) => verse.id === verseId);

        return <VerseCard key={verse.id} verse={verse} chapterId={chapterQuery.data.id} curVerseId={curVerseId} fontsize={fontsize} isBookmarkedVerse={isBookmarked} totalVerses={chapterQuery.data.total_verses} />;
      })}
    </div>
  );
}
