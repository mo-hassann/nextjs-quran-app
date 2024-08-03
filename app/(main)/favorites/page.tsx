"use client";
import CHAPTERS_LIST from "@/data/chapters-list.json";
import useGetFavoriteChaptersIds from "@/client/chapter/api/use-get-favorite-chapters-ids";
import ChapterCard from "@/client/chapter/components/chapter-card";
import Spinner from "@/components/spinner";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n.config";
import useUpdateSearchParams from "@/hooks/use-update-search-params";

export default function FavoritesPage() {
  const favoriteChaptersQuery = useGetFavoriteChaptersIds();
  const locale = useLocale() as Locale;

  const { searchParams } = useUpdateSearchParams();
  const search = (searchParams.get("search") || "").toLocaleLowerCase();

  if (favoriteChaptersQuery.isLoading || favoriteChaptersQuery.isPending) return <Spinner />;
  if (favoriteChaptersQuery.isError) return <p>error</p>;

  const chapters = CHAPTERS_LIST.filter((chapter) => favoriteChaptersQuery.data.some(({ chapterId }) => chapterId === chapter.id));
  const searchFilterChapters = chapters.filter((chapter) => chapter.name["ar"].includes(search) || chapter.name[locale].toLocaleLowerCase().includes(search) || chapter.transliterationName.toLocaleLowerCase().includes(search));
  if (searchFilterChapters.length === 0) return <p>no data.</p>;

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start P m-3">
      {searchFilterChapters.map((chapter) => (
        <ChapterCard key={chapter.id} id={chapter.id} name={chapter.name[locale]} transliterationName={chapter.transliterationName} type={chapter.type as "meccan" | "medinan"} versesCount={chapter.totalVerses} />
      ))}
    </div>
  );
}
