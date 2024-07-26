"use client";
import Spinner from "@/components/spinner";
import { useQuery } from "@tanstack/react-query";
import "../fonts.css";

import { Chapter } from "@/types";
import TranslationSection from "@/client/chapter/components/translation-section";

type props = {
  params: { id: string };
};

export default function TranslationPage({ params: { id } }: props) {
  const chapterQuery = useQuery<Chapter>({
    queryKey: ["chapter", id],
    queryFn: async () => {
      const res = await fetch(`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/en/${id}.json`);
      return await res.json();
    },
  });

  const error = chapterQuery.isError;
  const isLoading = chapterQuery.isLoading || chapterQuery.isPending;

  if (error) return "error";
  if (isLoading) return <Spinner />;

  return <TranslationSection chapter={chapterQuery.data} />;
}
