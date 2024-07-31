"use client";
import { useQuranPlayer } from "@/client/verse/hooks/use-quran-player";
import QuranPlayer from "@/components/quran-player";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { useEffect } from "react";

export default function ModelProvider() {
  const { isOpen, chapterId, verseId } = useQuranPlayer();
  const { updateSearchParams } = useUpdateSearchParams();

  // when the quran player model is open update the search params of the verse id
  useEffect(() => {
    if (isOpen && verseId && chapterId) {
      updateSearchParams({ verse: verseId, chapter: chapterId }, { scroll: false });
    }
  }, [updateSearchParams, isOpen, verseId, chapterId]);

  return <>{isOpen && <QuranPlayer />}</>;
}
