import { Heart } from "lucide-react";
import { useState } from "react";
import useToggleFavoriteVerse from "../../api/use-toggle-favorite-verse";
import { cn } from "@/lib/utils";

type props = {
  chapterId: number;
  verseId: number;
  isFavoriteVerse: boolean;
};

export default function FavoriteAction({ chapterId, isFavoriteVerse, verseId }: props) {
  const [isFavorite, setIsFavorite] = useState<boolean>(isFavoriteVerse);
  const favoriteVerseMutation = useToggleFavoriteVerse();
  const toggleFavorite = () => {
    setIsFavorite((state) => !state);
    favoriteVerseMutation.mutate(
      { chapterId, verseId },
      {
        onError() {
          setIsFavorite((state) => !state);
        },
      }
    );
  };

  return (
    <button disabled={favoriteVerseMutation.isPending} onClick={toggleFavorite}>
      <Heart className={cn("text-muted-foreground  cursor-pointer", isFavorite && "fill-rose-500 text-rose-500")} />
    </button>
  );
}
