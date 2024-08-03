import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Verse } from "@/types";
import { ArrowRight } from "lucide-react";
import AllVerseActions from "./verse-actions/all-actions";
import { cn } from "@/lib/utils";

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

  return (
    <div id={verseId} className={cn("bg-background p-7 rounded-md shadow-md scroll-mt-3", isActive && "outline outline-2 outline-primary/45 shadow-lg")} key={verse.id}>
      <div className="flex items-center justify-between gap-7 mb-6" style={{ direction: "rtl" }}>
        <h2 className={cn("text-2xl font-bold text-justify", isActive && "text-primary")} style={{ fontFamily: "uthmanic", fontSize: `${1.8 * fontsize}rem`, lineHeight: `${2.7 * fontsize}rem` }}>
          {verse.text}
        </h2>
        <span className="text-primary text-2xl">
          {chapterId}:{verse.id}
        </span>
      </div>
      <div style={{ direction: "ltr" }}>
        <div className="flex items-center gap-1.5 h-6">
          <p className="text-primary">ENGLISH-SAHIH INTERNATIONAL</p>
          <Separator orientation="vertical" />
          <Button className="p-0 text-secondary space-x-1.5" variant="link">
            <p>SEE TAFSIR</p> <ArrowRight size={16} />
          </Button>
        </div>
        {/* <p>{verse.transliteration}</p> */}
        <p className="py-3 text-lg text-foreground/80 text-left">{verse.translation}</p>
      </div>
      <Separator />
      <div className="flex items-center gap-3 py-5 text-muted-foreground/70">
        <AllVerseActions className="flex items-center gap-2" chapterId={chapterId} verseId={verse.id} totalVerses={totalVerses} verse={verse.text} />
      </div>
    </div>
  );
}
