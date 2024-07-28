"use client";
import CHAPTERS_LIST from "@/data/chapters-list.json";
import useGetFavoriteChaptersIds from "@/client/chapter/api/use-get-favorite-chapters-ids";
import ChapterCard from "@/client/chapter/components/chapter-card";
import Spinner from "@/components/spinner";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n.config";

export default function FavoritesPage() {
  const favoriteChaptersQuery = useGetFavoriteChaptersIds();
  const locale = useLocale() as Locale;

  if (favoriteChaptersQuery.isLoading || favoriteChaptersQuery.isPending) return <Spinner />;
  if (favoriteChaptersQuery.isError) return <p>error</p>;

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start P m-3">
      {CHAPTERS_LIST.filter((chapter) => favoriteChaptersQuery.data.some(({ chapterId }) => chapterId === chapter.id)).map((chapter) => (
        <ChapterCard isFavoriteChapter key={chapter.id} id={chapter.id} name={chapter.name[locale]} transliterationName={chapter.transliterationName} type={chapter.type as "meccan" | "medinan"} versesCount={chapter.totalVerses} />
      ))}
    </div>
  );
}
