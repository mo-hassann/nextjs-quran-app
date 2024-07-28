"use client";
import CHAPTERS_LIST from "@/data/chapters-list.json";
import ChapterCard from "./chapter-card";
import useGetFavoriteChaptersIds from "../api/use-get-favorite-chapters-ids";
import Spinner from "@/components/spinner";
import { useLocale } from "next-intl";
import { type Locale } from "@/i18n.config";

export default function ChapterContainer() {
  const favoriteChaptersQuery = useGetFavoriteChaptersIds();
  const locale = useLocale() as Locale;

  if (favoriteChaptersQuery.isLoading || favoriteChaptersQuery.isPending) return <Spinner />;
  if (favoriteChaptersQuery.isError) return <p>error</p>;

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start my-3">
      {CHAPTERS_LIST.map((chapter) => {
        const isFavoriteChapter = favoriteChaptersQuery.data.some(({ chapterId }) => chapterId === chapter.id);
        return <ChapterCard key={chapter.id} isFavoriteChapter={isFavoriteChapter} id={chapter.id} name={chapter.name[locale]} transliterationName={chapter.transliterationName} type={chapter.type as "meccan" | "medinan"} versesCount={chapter.totalVerses} />;
      })}
    </div>
  );
}
