import { Bookmark } from "lucide-react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import useToggleBookmarkVerse from "../../api/use-toggle-bookmark-verse";

type props = {
  chapterId: number;
  verseId: number;
  isBookmarkedVerse: boolean;
};

export default function BookmarkAction({ chapterId, isBookmarkedVerse, verseId }: props) {
  const [isFavorite, setIsFavorite] = useState<boolean>(isBookmarkedVerse);
  const bookmarkVerseMutation = useToggleBookmarkVerse();
  const toggleFavorite = () => {
    setIsFavorite((state) => !state);
    bookmarkVerseMutation.mutate(
      { chapterId, verseId },
      {
        onError() {
          setIsFavorite((state) => !state);
        },
      }
    );
  };

  return (
    <button disabled={bookmarkVerseMutation.isPending} onClick={toggleFavorite}>
      <Bookmark className={cn("text-muted-foreground  cursor-pointer", isFavorite && "fill-primary text-primary")} />
    </button>
  );
}
