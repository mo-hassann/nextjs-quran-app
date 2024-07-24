"use client";

import { type MouseEvent, useState } from "react";
import { Heart } from "lucide-react";

export default function FavoriteSurah() {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const toggleFavorite = (e: MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((state) => !state);
  };
  if (isFavorite) {
    return <Heart className="fill-rose-500 text-rose-500" onClick={toggleFavorite} />;
  } else {
    return <Heart className="text-muted-foreground" onClick={toggleFavorite} />;
  }
}
