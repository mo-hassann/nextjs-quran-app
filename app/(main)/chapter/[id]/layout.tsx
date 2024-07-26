import SettingsSidebar from "@/client/chapter/components/settings-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: props) {
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div>
          <Link href="reading">القراءة</Link>
          <Link href="translation">تدبر الايات</Link>
        </div>
        <Link href="/" className="size-9 flex items-center justify-center rounded-full hover:bg-background/40">
          <ArrowLeft />
        </Link>
      </div>
      <div className="flex gap-3">
        <div className="w-full">{children}</div>
        <SettingsSidebar />
      </div>
    </div>
  );
}
/* "use client";
import Spinner from "@/components/spinner";
import { useQuery } from "@tanstack/react-query";
import "./fonts.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ReadingSection from "@/client/chapter/components/reading-section";
import TranslationSection from "@/client/chapter/components/translation-section";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import SettingsSidebar from "@/client/chapter/components/settings-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type props = {
  params: { id: string };
};

export type Chapter = {
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

export default function ChapterPage({ params: { id } }: props) {
  const chapterQuery = useQuery<Chapter>({
    queryKey: ["chapter", id],
    queryFn: async () => {
      const res = await fetch(`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/en/${id}.json`);
      return await res.json();
    },
  });
  const { searchParams, updateSearchParam } = useUpdateSearchParams();
  const defaultSection = "reading";
  const curSection = searchParams.get("section") || defaultSection;

  const error = chapterQuery.isError;
  const isLoading = chapterQuery.isLoading || chapterQuery.isPending;

  if (error) return "error";
  if (isLoading) return <Spinner />;

  return (
    <div className="flex items-start gap-5 flex-row-reverse">
      <SettingsSidebar />
      <Tabs defaultValue={curSection} className="flex items-center flex-col gap-3 w-full">
        <div className="w-full flex items-center justify-between">
          <Button className="rounded-full" size="icon" variant="ghost">
            <ArrowLeft />
          </Button>
          <TabsList className="bg-muted-foreground/10 min-w-96 *:w-full">
            <TabsTrigger onClick={() => updateSearchParam("section", "reading")} value="reading">
              القراءة
            </TabsTrigger>
            <TabsTrigger onClick={() => updateSearchParam("section", "translating")} value="translating">
              تدبر الايات
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="reading">
          <ReadingSection chapter={chapterQuery.data} />
        </TabsContent>
        <TabsContent value="translating">
          <TranslationSection chapter={chapterQuery.data} />
        </TabsContent>
      </Tabs>
    </div>
  );
} */
