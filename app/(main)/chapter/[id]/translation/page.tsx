"use client";
import Spinner from "@/components/spinner";
import VerseCard from "@/client/verse/components/verse-card";
import useGetFavoriteVersesIds from "@/client/verse/api/use-get-favorite-verses-ids";
import useGetBookmarkVersesIds from "@/client/verse/api/use-get-bookmarks-verses-ids";
import useGetChapter from "@/client/chapter/api/use-get-chapter";
import useScrollToCurVerse from "@/client/verse/hooks/use-scroll-to-cur-verse";
import useCurVerseId from "@/client/verse/hooks/use-cur-verse-id";
import BsmAllah from "@/client/chapter/components/bsm-allah";

type props = {
  params: { id: string };
};

export default function TranslationPage({ params: { id: curChapterId } }: props) {
  const chapterQuery = useGetChapter(curChapterId);

  const favoriteVerseQuery = useGetFavoriteVersesIds();
  const bookmarkedVerseQuery = useGetBookmarkVersesIds();

  const curVerseId = useCurVerseId();

  const isError = chapterQuery.isError || favoriteVerseQuery.isError || bookmarkedVerseQuery.isError;
  const isLoading = chapterQuery.isLoading || chapterQuery.isPending || favoriteVerseQuery.isLoading || favoriteVerseQuery.isPending || bookmarkedVerseQuery.isLoading || bookmarkedVerseQuery.isPending;

  useScrollToCurVerse([chapterQuery]);

  if (isError) return "error";
  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-2">
      <BsmAllah className="self-center mb-2" />
      {chapterQuery.data.verses.map((verse) => {
        const isFavorite = favoriteVerseQuery.data.filter(({ chapterId }) => chapterId === +curChapterId).some(({ verseId }) => verse.id === verseId);
        const isBookmarked = bookmarkedVerseQuery.data.filter(({ chapterId }) => chapterId === +curChapterId).some(({ verseId }) => verse.id === verseId);

        return <VerseCard key={verse.id} verse={verse} chapterId={chapterQuery.data.id} curVerseId={curVerseId} isBookmarkedVerse={isBookmarked} isFavoriteVerse={isFavorite} totalVerses={chapterQuery.data.total_verses} />;
      })}
    </div>
  );
}
