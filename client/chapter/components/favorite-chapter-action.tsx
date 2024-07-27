"use client";

import { type MouseEvent, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import useToggleFavoriteChapter from "../api/use-toggle-favorite-chapter";

type props = {
  chapterId: number;
  isFavoriteChapter: boolean;
};

export default function FavoriteChapter({ chapterId, isFavoriteChapter }: props) {
  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoriteChapter);
  const favoriteChapterMutation = useToggleFavoriteChapter();
  const toggleFavorite = (e: MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((state) => !state);
    console.log(chapterId, "chapterid");
    favoriteChapterMutation.mutate(
      { chapterId },
      {
        onError() {
          setIsFavorite((state) => !state);
        },
      }
    );
  };

  return (
    <button disabled={favoriteChapterMutation.isPending} onClick={toggleFavorite}>
      <Heart className={cn("text-muted-foreground  cursor-pointer", isFavorite && "fill-rose-500 text-rose-500")} />
    </button>
  );
}
