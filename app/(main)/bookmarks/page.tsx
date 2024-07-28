"use client";
import useGetBookmarkVersesIds from "@/client/verse/api/use-get-bookmarks-verses-ids";
import Spinner from "@/components/spinner";
import Link from "next/link";
import CHAPTERS_LIST from "@/data/chapters-list.json";

export default function BookmarksPage() {
  const bookmarkedVerses = useGetBookmarkVersesIds();

  if (bookmarkedVerses.isLoading || bookmarkedVerses.isPending) return <Spinner />;
  if (bookmarkedVerses.isError) return <p>error</p>;

  return (
    <div>
      {bookmarkedVerses.data.map((verse) => (
        <Link href={`/chapter/${verse.chapterId}/reading#${verse.verseId}`} className="bg-background rounded-md p-3" key={`${verse.chapterId}_${verse.verseId}`}>
          <span>{CHAPTERS_LIST.find((chapter) => chapter.id === verse.chapterId)?.name}</span> <span>الاية {verse.verseId}</span>
        </Link>
      ))}
    </div>
  );
}
