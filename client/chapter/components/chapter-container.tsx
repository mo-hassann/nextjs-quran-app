"use client";
import CHAPTERS_LIST from "@/data/chapters-list.json";
import ChapterCard from "./chapter-card";
import { useLocale } from "next-intl";
import { type Locale } from "@/i18n.config";
import RandomVerseCard from "@/client/verse/components/random-verse-card";
import useUpdateSearchParams from "@/hooks/use-update-search-params";

export default function ChapterContainer() {
  const locale = useLocale() as Locale;
  const { searchParams } = useUpdateSearchParams();
  const search = (searchParams.get("search") || "").toLocaleLowerCase();

  const searchFilterChapters = CHAPTERS_LIST.filter((chapter) => chapter.name["ar"].includes(search) || chapter.name[locale].toLocaleLowerCase().includes(search) || chapter.transliterationName.toLocaleLowerCase().includes(search));
  if (searchFilterChapters.length === 0) return <p>no data.</p>;

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start my-3">
      <RandomVerseCard />
      {searchFilterChapters.map((chapter) => (
        <ChapterCard key={chapter.id} id={chapter.id} name={chapter.name[locale]} transliterationName={chapter.transliterationName} type={chapter.type as "meccan" | "medinan"} versesCount={chapter.totalVerses} />
      ))}
    </div>
  );
}
