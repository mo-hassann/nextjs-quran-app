"use client";
import VerseCard from "@/client/verse/components/verse-card";

import useGetChapter from "@/client/chapter/api/use-get-chapter";

import BsmAllah from "@/client/chapter/components/bsm-allah";
import useScrollToElement from "@/hooks/use-scroll-to-element";
import { useFontsize } from "@/client/chapter/hooks/use-fontsize";
import useCurVerseId from "@/client/verse/hooks/use-cur-verse-id";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import ErrorCard from "@/components/error-card";
import { Skeleton } from "@/components/ui/skeleton";
import NoData from "@/components/no-data";
import SearchFor from "@/components/search-for";
import { useTafseer } from "@/client/verse/hooks/use-tafseer";

type props = {
  params: { id: string };
};

export default function TranslationPage({ params: { id: curChapterId } }: props) {
  const chapterQuery = useGetChapter(curChapterId);
  const tafseer = useTafseer();

  const curVerseId = useCurVerseId();

  const { fontsize } = useFontsize();

  const { searchParams } = useUpdateSearchParams();
  const search = (searchParams.get("search") || "").toLocaleLowerCase().replace(/[\u064B-\u065F]/g, "");

  useScrollToElement(curVerseId, []);

  if (chapterQuery.isLoading || chapterQuery.isPending) return <LoadingSkeleton />;
  if (chapterQuery.isError) return <ErrorCard />;

  const searchFilterVerses = chapterQuery.data.verses.filter((verse) => verse.text.replace(/[\u064B-\u065F]/g, "").includes(search) || verse.translation?.toLocaleLowerCase().includes(search) || verse.transliteration.toLocaleLowerCase().includes(search));

  if (searchFilterVerses.length === 0) return <NoData />;

  return (
    <div className="flex flex-col gap-2">
      {!!search && <SearchFor text={search} />}
      {/* omit Al-Fatihah and At-Tawbah ادراج "بسم الله الرحمن الرحيم" في جميع السور ماعدا سورة الفاتحة والتوبة */}
      {![1, 9].includes(+curChapterId) && <BsmAllah className="w-auto" style={{ height: `${3.5 * fontsize}rem` }} />}
      {searchFilterVerses.map((verse) => (
        <VerseCard key={verse.id} verse={verse} chapterId={chapterQuery.data.id} curVerseId={curVerseId} fontsize={fontsize} totalVerses={chapterQuery.data.total_verses} handleOpenTafseerModel={() => tafseer.onOpen({ chapterId: chapterQuery.data.id, verseId: verse.id })} />
      ))}
    </div>
  );
}

const LoadingSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="w-full h-64 rounded-md" />
  </div>
);
