"use client";
import ReadingSection from "@/client/chapter/components/reading-section";
import useGetChapter from "@/client/chapter/api/use-get-chapter";
import useCurVerseId from "@/client/verse/hooks/use-cur-verse-id";
import useScrollToElement from "@/hooks/use-scroll-to-element";
import Spinner from "@/components/spinner";

type props = {
  params: { id: string };
};

export default function ReadingPage({ params: { id: curChapterId } }: props) {
  const curVerseId = useCurVerseId();
  const chapterQuery = useGetChapter(curChapterId);

  useScrollToElement(curVerseId, [chapterQuery]);

  if (chapterQuery.isLoading || chapterQuery.isPending) return <Spinner />;
  if (chapterQuery.isError) return <p>error</p>;

  return <ReadingSection chapter={chapterQuery.data} />;
}
