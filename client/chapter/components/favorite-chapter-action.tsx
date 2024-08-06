"use client";

import { type MouseEvent, useState } from "react";
import { Heart, HeartOff } from "lucide-react";
import { cn } from "@/lib/utils";
import useToggleFavoriteChapter from "../api/use-toggle-favorite-chapter";
import { useSession } from "@/hooks/use-session";
import useGetFavoriteChaptersIds from "../api/use-get-favorite-chapters-ids";
import Spinner from "@/components/spinner";
import { useSignupModel } from "@/hooks/use-signup-model";

type props = {
  chapterId: number;
};

export default function FavoriteChapter({ chapterId }: props) {
  const favoriteChapterMutation = useToggleFavoriteChapter();
  const { session, status } = useSession();
  const favoriteChaptersQuery = useGetFavoriteChaptersIds(!!session);
  const signupModel = useSignupModel();

  if (!session && status !== "pending")
    return (
      <button onClick={() => signupModel.onOpen()}>
        <Heart className="text-muted-foreground cursor-pointer" />
      </button>
    );

  if (favoriteChaptersQuery.isLoading || favoriteChaptersQuery.isPending) return <Spinner />;
  if (favoriteChaptersQuery.isError) return <HeartOff className="text-muted-foreground cursor-not-allowed" />;

  const isFavorite = favoriteChaptersQuery.data.some((chapter) => chapterId === chapter.chapterId);

  const toggleFavorite = () => {
    if (!session) return;
    favoriteChapterMutation.mutate({ chapterId });
  };

  return (
    <button disabled={favoriteChapterMutation.isPending} onClick={toggleFavorite}>
      <Heart className={cn("text-muted-foreground cursor-pointer", isFavorite && "fill-rose-500 text-rose-500")} />
    </button>
  );
}
