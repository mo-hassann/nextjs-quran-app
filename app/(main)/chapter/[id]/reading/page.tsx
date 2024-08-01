"use client";
import Spinner from "@/components/spinner";
import ReadingSection from "@/client/chapter/components/reading-section";
import useGetChapter from "@/client/chapter/api/use-get-chapter";
import useGetBookmarkVersesIds from "@/client/verse/api/use-get-bookmarks-verses-ids";
import useCurVerseId from "@/client/verse/hooks/use-cur-verse-id";
import useScrollToElement from "@/hooks/use-scroll-to-element";

type props = {
  params: { id: string };
};

export default function ReadingPage({ params: { id: curChapterId } }: props) {
  const chapterQuery = useGetChapter(curChapterId);

  const bookmarkedVerseQuery = useGetBookmarkVersesIds();

  const curVerseId = useCurVerseId();

  useScrollToElement(curVerseId, [chapterQuery]);

  const isError = chapterQuery.isError || bookmarkedVerseQuery.isError;
  const isLoading = chapterQuery.isLoading || chapterQuery.isPending || bookmarkedVerseQuery.isLoading || bookmarkedVerseQuery.isPending;

  if (isError) return "error";
  if (isLoading) return <Spinner />;

  return <ReadingSection chapter={chapterQuery.data} />;
}
