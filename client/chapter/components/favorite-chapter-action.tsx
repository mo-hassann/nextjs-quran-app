"use client";

import { type MouseEvent, useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FavoriteChapter() {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const toggleFavorite = (e: MouseEvent) => {
    e.stopPropagation();
    setIsFavorite((state) => !state);
  };

  return <Heart className={cn("text-muted-foreground  cursor-pointer", isFavorite && "fill-rose-500 text-rose-500")} onClick={toggleFavorite} />;
}
