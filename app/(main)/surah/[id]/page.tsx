"use client";
import Spinner from "@/components/spinner";
import { useQuery } from "@tanstack/react-query";
import "./fonts.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ReadingSection from "@/client/surah/components/reading-section";

type props = {
  params: { id: string };
};

export type Surah = {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
  verses: {
    id: number;
    text: string;
    translation: string;
    transliteration: string;
  }[];
};

export default function SurahPage({ params: { id } }: props) {
  const surahQuery = useQuery<Surah>({
    queryKey: ["surah", id],
    queryFn: async () => {
      const res = await fetch(`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/en/${id}.json`);
      return await res.json();
    },
  });

  const error = surahQuery.isError;
  const isLoading = surahQuery.isLoading || surahQuery.isPending;

  if (error) return "error";
  if (isLoading) return <Spinner />;

  return (
    <Tabs defaultValue="reading" className="flex items-center flex-col gap-3">
      <TabsList className="bg-muted-foreground/10 min-w-96 *:w-full">
        <TabsTrigger value="reading">القراءة</TabsTrigger>
        <TabsTrigger value="translating">الترجمة</TabsTrigger>
      </TabsList>
      <TabsContent value="reading">
        <ReadingSection surah={surahQuery.data} />;
      </TabsContent>
      <TabsContent value="translating">Change your password here.</TabsContent>
    </Tabs>
  );
}
