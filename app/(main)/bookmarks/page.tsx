"use client";
import useGetBookmarkVersesIds from "@/client/verse/api/use-get-bookmarks-verses-ids";
import Spinner from "@/components/spinner";
import CHAPTERS_LIST from "@/data/chapters-list.json";
import BookmarkedVerse from "@/client/verse/components/bookmarked-verse";

export default function BookmarksPage() {
  const bookmarkedVerses = useGetBookmarkVersesIds();

  if (bookmarkedVerses.isLoading || bookmarkedVerses.isPending) return <Spinner />;
  if (bookmarkedVerses.isError) return <p>error</p>;

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start P m-3">
      {bookmarkedVerses.data.map((verse) => {
        const chapter = CHAPTERS_LIST.find((chapter) => chapter.id === verse.chapterId)!;

        return <BookmarkedVerse key={`${verse.chapterId}-${verse.verseId}`} chapterId={verse.chapterId} chapterName={chapter.name} isBookmarkedVerse transliterationChapterName={chapter.transliterationName} verseId={verse.verseId} />;
      })}
    </div>
  );
}
