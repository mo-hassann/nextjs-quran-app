"use client";
import Spinner from "@/components/spinner";
import { useQuery } from "@tanstack/react-query";
import "../fonts.css";

import { Chapter } from "@/types";

import VerseCard from "@/client/verse/components/verse-card";
import useGetFavoriteVersesIds from "@/client/verse/api/use-get-favorite-verses-ids";
import useGetBookmarkVersesIds from "@/client/verse/api/use-get-bookmarks-verses-ids";
import useGetChapter from "@/client/chapter/api/use-get-chapter";

type props = {
  params: { id: string };
};

export default function TranslationPage({ params: { id: curChapterId } }: props) {
  const chapterQuery = useGetChapter(curChapterId);

  const favoriteVerseQuery = useGetFavoriteVersesIds();
  const bookmarkedVerseQuery = useGetBookmarkVersesIds();

  console.log("test101", favoriteVerseQuery.data, bookmarkedVerseQuery);

  const error = chapterQuery.isError || favoriteVerseQuery.isError || bookmarkedVerseQuery.isError;
  const isLoading = chapterQuery.isLoading || chapterQuery.isPending || favoriteVerseQuery.isLoading || favoriteVerseQuery.isPending || bookmarkedVerseQuery.isLoading || bookmarkedVerseQuery.isPending;

  if (error) return "error";
  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-2">
      {chapterQuery.data.verses.map((verse) => {
        const isFavorite = favoriteVerseQuery.data.filter(({ chapterId }) => chapterId === +curChapterId).some(({ verseId }) => verse.id === verseId);
        const isBookmarked = bookmarkedVerseQuery.data.filter(({ chapterId }) => chapterId === +curChapterId).some(({ verseId }) => verse.id === verseId);

        return <VerseCard key={verse.id} verse={verse} chapterId={chapterQuery.data.id} isBookmarkedVerse={isBookmarked} isFavoriteVerse={isFavorite} />;
      })}
    </div>
  );
}
