import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Verse } from "@/types";
import { ArrowRight } from "lucide-react";
import AllVerseActions from "./verse-actions/all-actions";

type props = {
  verse: Verse;
  chapterId: number;
  isBookmarkedVerse: boolean;
  isFavoriteVerse: boolean;
};

export default function VerseCard({ verse, chapterId, isBookmarkedVerse, isFavoriteVerse }: props) {
  return (
    <div id={`${verse.id}`} className="bg-background p-7 rounded-md shadow-md" key={verse.id}>
      <div className="flex items-center justify-between gap-7 mb-6" style={{ direction: "rtl" }}>
        <h2 className="text-2xl font-bold text-justify" style={{ fontFamily: "uthmanic" }}>
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
        <AllVerseActions chapterId={chapterId} isBookmarkedVerse={isBookmarkedVerse} isFavoriteVerse={isFavoriteVerse} verseId={verse.id} />
      </div>
    </div>
  );
}
