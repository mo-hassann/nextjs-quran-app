"use client";
import ReadingSection from "@/client/chapter/components/reading-section";
import useGetChapter from "@/client/chapter/api/use-get-chapter";
import useCurVerseId from "@/client/verse/hooks/use-cur-verse-id";
import useScrollToElement from "@/hooks/use-scroll-to-element";
import ErrorCard from "@/components/error-card";
import { Skeleton } from "@/components/ui/skeleton";

type props = {
  params: { id: string };
};

export default function ReadingPage({ params: { id: curChapterId } }: props) {
  const curVerseId = useCurVerseId();
  const chapterQuery = useGetChapter(curChapterId);

  useScrollToElement(curVerseId, []);

  if (chapterQuery.isLoading || chapterQuery.isPending) return <LoadingSkeleton />;
  if (chapterQuery.isError) return <ErrorCard />;

  return <ReadingSection chapter={chapterQuery.data} />;
}

const LoadingSkeleton = () => (
  <div className="flex flex-col gap-3 bg-background shadow-md md:p-6 p-3 sm:p-5 rounded-md mx-auto w-[600px] max-w-[80%] h-full">
    <Skeleton className="w-full h-8 rounded-sm" />
    <Skeleton className="w-full h-8 rounded-sm" />
    <Skeleton className="w-10/12 h-8 rounded-sm" />
  </div>
);
