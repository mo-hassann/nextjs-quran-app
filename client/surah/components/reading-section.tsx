import Image from "next/image";
import type { Surah } from "@/app/(main)/surah/[id]/page";
import { convertToArabicNumbers } from "@/lib";

type props = {
  surah: Surah;
};

export default function ReadingSection({ surah }: props) {
  const scaleFactor = 1.2;

  return (
    <div className="flex items-center flex-col gap-3">
      {/* omit Al-Fatihah and At-Tawbah ادراج "بسم الله الرحمن الرحيم" في جميع السور ماعدا سورة الفاتحة والتوبة */}
      {![1, 9].includes(surah.id) && <Image className="w-[24vmin]" style={{ width: `${24 * scaleFactor}vmin` }} alt="bsm-allah" src="/imgs/bsm-allah.svg" width={250} height={45} />}

      <div className="font-bold text-justify" style={{ width: `${50 * scaleFactor}vmin`, fontSize: `${3 * scaleFactor}vmin`, textAlignLast: "center", fontFamily: "uthmanic" }}>
        {surah.verses.map((verse) => (
          <span className="hover:bg-primary/15 cursor-pointer" key={verse.id}>
            <span>{verse.text}</span>
            <span className="inline-block" style={{ fontSize: `${4 * scaleFactor}vmin`, padding: `0 ${0.5 * scaleFactor}vmin` }}>
              {convertToArabicNumbers(`${verse.id}`)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* 
    <div className="flex items-center flex-col gap-3">
  
      <div className="text-[1.875rem] text-[3vmin] font-bold text-justify w-[50px] w-[50vmin] " style={{ width:`${50*scaleFactor}vmin`,fontSize:`${3*scaleFactor}vmin`, textAlignLast: "center", fontFamily: "uthmanic" }}>
        {surah.verses.map((verse) => (
          <span className="hover:bg-primary/15 cursor-pointer" key={verse.id}>
            <span>{verse.text}</span>
            <span className="px-1.5 px-[0.5vmin] text-[2.5rem] text-[4vmin] inline-block" style={{ fontSize:`${4*scaleFactor}vmin`,padding: `0 ${0.5* scaleFactor}vmin`}}>{convertToArabicNumbers(`${verse.id}`)}</span>
          </span>
        ))}
      </div>
    </div>

*/
