import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import ChapterActions from "../../verse/components/verse-actions/all-actions";
import { Chapter } from "@/types";

type props = {
  chapter: Chapter;
};

export default function TranslationSection({ chapter }: props) {
  return (
    <div className="flex flex-col gap-2">
      {chapter.verses.map((verse) => (
        <div id={`verse_${verse.id}`} className="bg-background p-7 rounded-md shadow-md" key={verse.id}>
          <div className="flex items-center justify-between gap-7 mb-6" style={{ direction: "rtl" }}>
            <h2 className="text-2xl font-bold text-justify" style={{ fontFamily: "uthmanic" }}>
              {verse.text}
            </h2>
            <span className="text-primary text-2xl">
              {chapter.id}:{verse.id}
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
            <ChapterActions />
          </div>
        </div>
      ))}
    </div>
  );
}
