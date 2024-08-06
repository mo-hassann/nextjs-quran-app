"use client";
import CHAPTERS_LIST from "@/data/chapters-list.json";
import useGetFavoriteChaptersIds from "@/client/chapter/api/use-get-favorite-chapters-ids";
import ChapterCard from "@/client/chapter/components/chapter-card";
import Spinner from "@/components/spinner";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n.config";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorCard from "@/components/error-card";
import NoData from "@/components/no-data";
import SearchFor from "@/components/search-for";

export default function FavoritesPage() {
  const favoriteChaptersQuery = useGetFavoriteChaptersIds();
  const locale = useLocale() as Locale;

  const { searchParams } = useUpdateSearchParams();
  const search = (searchParams.get("search") || "").toLocaleLowerCase();

  if (favoriteChaptersQuery.isLoading || favoriteChaptersQuery.isPending) return <LoadingSkeleton />;
  if (favoriteChaptersQuery.isError) return <ErrorCard />;

  const chapters = CHAPTERS_LIST.filter((chapter) => favoriteChaptersQuery.data.some(({ chapterId }) => chapterId === chapter.id));
  const searchFilterChapters = chapters.filter((chapter) => chapter.name["ar"].includes(search) || chapter.name[locale].toLocaleLowerCase().includes(search) || chapter.transliterationName.toLocaleLowerCase().includes(search));
  if (searchFilterChapters.length === 0) return <NoData />;

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start P m-3">
      {!!search && <SearchFor text={search} />}
      {searchFilterChapters.map((chapter) => (
        <ChapterCard key={chapter.id} id={chapter.id} name={chapter.name[locale]} transliterationName={chapter.transliterationName} type={chapter.type as "meccan" | "medinan"} versesCount={chapter.totalVerses} />
      ))}
    </div>
  );
}

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start P m-3">
    <Skeleton className="h-40 w-full" />
    <Skeleton className="h-40 w-full" />
  </div>
);
