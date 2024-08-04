import { convertToArabicNumbers } from "@/lib";
import BsmAllah from "./bsm-allah";
import { Chapter } from "@/types";
import useCurVerseId from "@/client/verse/hooks/use-cur-verse-id";
import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import AllVerseActions from "@/client/verse/components/verse-actions/all-actions";
import { useFontsize } from "../hooks/use-fontsize";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { redirect } from "next/navigation";

type props = {
  chapter: Chapter;
};

export default function ReadingSection({ chapter }: props) {
  const curVerseId = useCurVerseId();
  const { fontsize } = useFontsize();

  const scaleFactor = 0.73;

  const { searchParams } = useUpdateSearchParams();
  const search = searchParams.get("search");
  if (search) return redirect(`learning?${searchParams.toString()}`);

  return (
    <div className="flex items-center flex-col gap-3 bg-background shadow-md md:p-6 p-3 sm:p-5 rounded-md mx-auto w-fit" style={{ direction: "rtl" }}>
      {/* omit Al-Fatihah and At-Tawbah ادراج "بسم الله الرحمن الرحيم" في جميع السور ماعدا سورة الفاتحة والتوبة */}
      {![1, 9].includes(chapter.id) && <BsmAllah className="w-auto" style={{ height: `${4.3 * fontsize * scaleFactor}rem` }} />}

      <div className="font-bold text-justify" style={{ width: `${55 * fontsize * scaleFactor}rem`, fontSize: `${3 * fontsize * scaleFactor}rem`, textAlignLast: "center", fontFamily: "uthmanic" }}>
        {chapter.verses.map((verse) => {
          const verseId = `${chapter.id}-${verse.id}`;
          const isActive = curVerseId === verseId;

          const isAlFatihaChapter = chapter.id === 1;

          return (
            <Popover key={verse.id}>
              <PopoverTrigger asChild>
                <h2 id={verseId} className={cn("hover:text-primary cursor-pointer inline last:*:last-of-type:inline scroll-mt-3", isActive && "text-primary/80", isAlFatihaChapter && verse.id === 1 && "block")}>
                  <span>{verse.text}</span>
                  <span className="inline-block font-normal" style={{ fontSize: `${4 * fontsize * scaleFactor}rem`, padding: `0 ${0.5 * fontsize * scaleFactor}rem` }}>
                    {convertToArabicNumbers(`${verse.id}`)}
                  </span>
                </h2>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <AllVerseActions className="flex items-center gap-2" chapterId={chapter.id} totalVerses={chapter.total_verses} verse={verse.text} verseId={verse.id} />
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
    </div>
  );
}

/* 
    <div className="flex items-center flex-col gap-3">
  
      <div className="text-[1.875rem] text-[3vmin] font-bold text-justify w-[50px] w-[50vmin] " style={{ width:`${50*scaleFactor}vmin`,fontSize:`${3*scaleFactor}vmin`, textAlignLast: "center", fontFamily: "uthmanic" }}>
        {chapter.verses.map((verse) => (
          <span className="hover:bg-primary/15 cursor-pointer" key={verse.id}>
            <span>{verse.text}</span>
            <span className="px-1.5 px-[0.5vmin] text-[2.5rem] text-[4vmin] inline-block" style={{ fontSize:`${4*scaleFactor}vmin`,padding: `0 ${0.5* scaleFactor}vmin`}}>{convertToArabicNumbers(`${verse.id}`)}</span>
          </span>
        ))}
      </div>
    </div>

*/
