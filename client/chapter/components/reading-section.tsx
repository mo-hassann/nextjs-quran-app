import { convertToArabicNumbers } from "@/lib";
import BsmAllah from "./bsm-allah";
import { Chapter } from "@/types";
import useCurVerseId from "@/client/verse/hooks/use-cur-verse-id";
import { cn } from "@/lib/utils";

type props = {
  chapter: Chapter;
};

export default function ReadingSection({ chapter }: props) {
  const curVerseId = useCurVerseId();

  const scaleFactor = 1.2;

  return (
    <div className="flex items-center flex-col gap-3 bg-background shadow-md p-6 rounded-md mx-auto w-fit" style={{ direction: "rtl" }}>
      {/* omit Al-Fatihah and At-Tawbah ادراج "بسم الله الرحمن الرحيم" في جميع السور ماعدا سورة الفاتحة والتوبة */}
      {![1, 9].includes(chapter.id) && <BsmAllah className="w-[24vmin]" style={{ width: `${24 * scaleFactor}vmin` }} />}

      <div className="font-bold text-justify" style={{ width: `${50 * scaleFactor}vmin`, fontSize: `${3 * scaleFactor}vmin`, textAlignLast: "center", fontFamily: "uthmanic" }}>
        {chapter.verses.map((verse) => {
          const verseId = `${chapter.id}-${verse.id}`;
          const isActive = curVerseId === verseId;

          return (
            <h2 id={verseId} className={cn("hover:bg-primary/15 cursor-pointer inline last:*:last-of-type:inline scroll-mt-3", isActive && "text-primary")} key={verse.id}>
              <span>{verse.text}</span>
              <span className="inline-block font-normal" style={{ fontSize: `${4 * scaleFactor}vmin`, padding: `0 ${0.5 * scaleFactor}vmin` }}>
                {convertToArabicNumbers(`${verse.id}`)}
              </span>
            </h2>
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
