"use client";
import useGetBookmarkVersesIds from "@/client/verse/api/use-get-bookmarks-verses-ids";
import CHAPTERS_LIST from "@/data/chapters-list.json";
import BookmarkedVerse from "@/client/verse/components/bookmarked-verse";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n.config";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorCard from "@/components/error-card";
import NoData from "@/components/no-data";
import SearchFor from "@/components/search-for";

export default function BookmarksPage() {
  const bookmarkedVersesIds = useGetBookmarkVersesIds();
  const locale = useLocale() as Locale;

  const { searchParams } = useUpdateSearchParams();
  const search = (searchParams.get("search") || "").toLocaleLowerCase();

  if (bookmarkedVersesIds.isLoading || bookmarkedVersesIds.isPending) return <LoadingSkeleton />;
  if (bookmarkedVersesIds.isError) return <ErrorCard />;

  const bookmarkedVerses = bookmarkedVersesIds.data.map((verse) => ({ ...verse, chapter: CHAPTERS_LIST.find((chapter) => chapter.id === verse.chapterId)! }));

  const searchFilterBookmarkedVerses = bookmarkedVerses.filter(
    (verse) => search.includes(verse.verseId.toString()) || verse.chapter.name["ar"].includes(search) || verse.chapter.name[locale].toLocaleLowerCase().includes(search) || verse.chapter.transliterationName.toLocaleLowerCase().includes(search)
  );
  if (searchFilterBookmarkedVerses.length === 0) return <NoData />;

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start P m-3">
      {!!search && <SearchFor text={search} />}
      {searchFilterBookmarkedVerses.map((verse) => {
        return <BookmarkedVerse key={`${verse.chapterId}-${verse.verseId}`} chapterId={verse.chapterId} chapterName={verse.chapter.name} transliterationChapterName={verse.chapter.transliterationName} verseId={verse.verseId} />;
      })}
    </div>
  );
}

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start P m-3">
    <Skeleton className="h-40 w-full" />
    <Skeleton className="h-40 w-full" />
  </div>
);
