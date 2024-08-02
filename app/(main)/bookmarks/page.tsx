"use client";
import useGetBookmarkVersesIds from "@/client/verse/api/use-get-bookmarks-verses-ids";
import Spinner from "@/components/spinner";
import CHAPTERS_LIST from "@/data/chapters-list.json";
import BookmarkedVerse from "@/client/verse/components/bookmarked-verse";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n.config";

export default function BookmarksPage() {
  const bookmarkedVersesIds = useGetBookmarkVersesIds();
  const locale = useLocale() as Locale;

  const { searchParams } = useUpdateSearchParams();
  const search = (searchParams.get("search") || "").toLocaleLowerCase();

  if (bookmarkedVersesIds.isLoading || bookmarkedVersesIds.isPending) return <Spinner />;
  if (bookmarkedVersesIds.isError) return <p>error</p>;

  const bookmarkedVerses = bookmarkedVersesIds.data.map((verse) => ({ ...verse, chapter: CHAPTERS_LIST.find((chapter) => chapter.id === verse.chapterId)! }));

  const searchFilterBookmarkedVerses = bookmarkedVerses.filter(
    (verse) => search.includes(verse.verseId.toString()) || verse.chapter.name["ar"].includes(search) || verse.chapter.name[locale].toLocaleLowerCase().includes(search) || verse.chapter.transliterationName.toLocaleLowerCase().includes(search)
  );
  if (searchFilterBookmarkedVerses.length === 0) return <p>no data.</p>;

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start P m-3">
      {searchFilterBookmarkedVerses.map((verse) => {
        return <BookmarkedVerse key={`${verse.chapterId}-${verse.verseId}`} chapterId={verse.chapterId} chapterName={verse.chapter.name} isBookmarkedVerse transliterationChapterName={verse.chapter.transliterationName} verseId={verse.verseId} />;
      })}
    </div>
  );
}
