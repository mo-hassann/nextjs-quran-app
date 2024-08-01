"use client";
import Spinner from "@/components/spinner";
import VerseCard from "@/client/verse/components/verse-card";
import useGetFavoriteVersesIds from "@/client/verse/api/use-get-favorite-verses-ids";
import useGetBookmarkVersesIds from "@/client/verse/api/use-get-bookmarks-verses-ids";
import useGetChapter from "@/client/chapter/api/use-get-chapter";
import useScrollToCurVerse from "@/hooks/use-scroll-to-element";
import useCurVerseId from "@/client/verse/hooks/use-cur-verse-id";
import BsmAllah from "@/client/chapter/components/bsm-allah";
import useScrollToElement from "@/hooks/use-scroll-to-element";
import { useFontsize } from "@/client/chapter/hooks/use-fontsize";

type props = {
  params: { id: string };
};

export default function TranslationPage({ params: { id: curChapterId } }: props) {
  const chapterQuery = useGetChapter(curChapterId);

  const favoriteVerseQuery = useGetFavoriteVersesIds();
  const bookmarkedVerseQuery = useGetBookmarkVersesIds();

  const curVerseId = useCurVerseId();
  const { fontsize } = useFontsize();

  const isError = chapterQuery.isError || favoriteVerseQuery.isError || bookmarkedVerseQuery.isError;
  const isLoading = chapterQuery.isLoading || chapterQuery.isPending || favoriteVerseQuery.isLoading || favoriteVerseQuery.isPending || bookmarkedVerseQuery.isLoading || bookmarkedVerseQuery.isPending;

  useScrollToElement(curVerseId, [chapterQuery]);

  if (isError) return "error";
  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-2">
      {/* omit Al-Fatihah and At-Tawbah ادراج "بسم الله الرحمن الرحيم" في جميع السور ماعدا سورة الفاتحة والتوبة */}
      {![1, 9].includes(+curChapterId) && <BsmAllah className="w-auto" style={{ height: `${3.5 * fontsize}rem` }} />}
      {chapterQuery.data.verses.map((verse) => {
        const isFavorite = favoriteVerseQuery.data.filter(({ chapterId }) => chapterId === +curChapterId).some(({ verseId }) => verse.id === verseId);
        const isBookmarked = bookmarkedVerseQuery.data.filter(({ chapterId }) => chapterId === +curChapterId).some(({ verseId }) => verse.id === verseId);

        return <VerseCard key={verse.id} verse={verse} chapterId={chapterQuery.data.id} curVerseId={curVerseId} fontsize={fontsize} isBookmarkedVerse={isBookmarked} isFavoriteVerse={isFavorite} totalVerses={chapterQuery.data.total_verses} />;
      })}
    </div>
  );
}
