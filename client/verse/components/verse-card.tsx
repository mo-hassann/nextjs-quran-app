import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Verse } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AllVerseActions from "./verse-actions/all-actions";
import { cn } from "@/lib/utils";
import { useTafseer } from "../hooks/use-tafseer";
import { useLocale } from "next-intl";
import { Locale } from "@/i18n.config";

type props = {
  verse: Verse;
  chapterId: number;
  totalVerses: number;
  curVerseId?: string;
  fontsize: number;
};

export default function VerseCard({ verse, chapterId, curVerseId, totalVerses, fontsize }: props) {
  const verseId = `${chapterId}-${verse.id}`;
  const isActive = curVerseId === verseId;
  const { onOpen } = useTafseer();
  const locale = useLocale() as Locale;

  return (
    <div id={verseId} className={cn("bg-background p-7 rounded-md shadow-md scroll-mt-3", isActive && "outline outline-2 outline-primary/45 shadow-lg")} key={verse.id}>
      <div className="flex items-center justify-between gap-7" style={{ direction: "rtl" }}>
        <h2 className={cn("text-2xl font-bold text-justify", isActive && "text-primary")} style={{ fontFamily: "uthmanic", fontSize: `${1.8 * fontsize}rem`, lineHeight: `${2.7 * fontsize}rem` }}>
          {verse.text}
        </h2>
        <span className="text-primary text-2xl">
          {chapterId}:{verse.id}
        </span>
      </div>

      {locale === "ar" && (
        <Button onClick={() => onOpen({ chapterId, verseId: verse.id })} className="p-0 text-secondary" variant="link">
          <p>قراءة التفسير</p> <ArrowLeft size={16} />
        </Button>
      )}

      <p className="my-2 text-muted-foreground text-left">{verse.transliteration}</p>

      {/*   <div className="flex items-center gap-1.5 h-6">
        <p className="text-primary text-sm md:text-base">ENGLISH-SAHIH INTERNATIONAL</p>
        <Separator orientation="vertical" />
        </div> */}

      {!!verse.translation && (
        <div style={{ direction: "ltr" }}>
          <p className="py-3 text-base md:text-lg text-foreground/80 text-left">{verse.translation}</p>
        </div>
      )}

      <Separator />
      <div className="flex items-center gap-3 py-5 text-muted-foreground/70">
        <AllVerseActions className="flex items-center gap-2" chapterId={chapterId} verseId={verse.id} totalVerses={totalVerses} verse={verse.text} />
      </div>
    </div>
  );
}
