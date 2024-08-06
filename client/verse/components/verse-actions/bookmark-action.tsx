import { Bookmark, BookmarkXIcon } from "lucide-react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import useToggleBookmarkVerse from "../../api/use-toggle-bookmark-verse";
import useGetBookmarkVersesIds from "../../api/use-get-bookmarks-verses-ids";
import { useSession } from "@/hooks/use-session";
import Spinner from "@/components/spinner";
import { useSignupModel } from "@/hooks/use-signup-model";

type props = {
  chapterId: number;
  verseId: number;
};

export default function BookmarkAction({ chapterId, verseId }: props) {
  const bookmarkVerseMutation = useToggleBookmarkVerse();
  const { session, status } = useSession();
  const bookmarkedVerseQuery = useGetBookmarkVersesIds(!!session);
  const signupModel = useSignupModel();

  if (!session && status !== "pending")
    return (
      <button onClick={() => signupModel.onOpen()}>
        <Bookmark className="text-muted-foreground  cursor-pointer" />
      </button>
    );

  if (bookmarkedVerseQuery.isLoading || bookmarkedVerseQuery.isPending) return <Spinner />;
  if (bookmarkedVerseQuery.isError) return <BookmarkXIcon className="text-muted-foreground cursor-not-allowed" />;

  const isFavorite = bookmarkedVerseQuery.data.some((verse) => verse.chapterId === chapterId && verse.verseId === verseId);

  const toggleFavorite = () => {
    bookmarkVerseMutation.mutate({ chapterId, verseId });
  };

  return (
    <button disabled={bookmarkVerseMutation.isPending} onClick={toggleFavorite}>
      <Bookmark className={cn("text-muted-foreground cursor-pointer", isFavorite && "fill-primary text-primary")} />
    </button>
  );
}
