import ChapterContainer from "@/client/chapter/components/chapter-container";
import { convertToArabicNumbers } from "@/lib";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Link
        href={"/chapter/2/translation?verse=144"}
        className="relative overflow-hidden w-full h-[220px] rounded-md text-2xl font-semibold flex items-center justify-center bg-primary/85 hover:bg-primary/80 hover:shadow-lg shadow-md text-white text-justify p-4 mb-8"
        style={{ textAlignLast: "right" }}
      >
        <Image className="absolute top-24 -right-24 opacity-40 animate-spin" style={{ animationDuration: "90s" }} width={220} height={220} src="./imgs/islamic-decorations.svg" alt="" />
        <Image className="absolute bottom-24 -left-24 opacity-40 animate-spin" style={{ animationDuration: "90s" }} width={220} height={220} src="./imgs/islamic-decorations.svg" alt="" />
        <h2 style={{ fontFamily: "uthmanic" }}>
          قَدۡ نَرَىٰ تَقَلُّبَ وَجۡهِكَ فِي ٱلسَّمَآءِۖ فَلَنُوَلِّيَنَّكَ قِبۡلَةٗ تَرۡضَىٰهَاۚ فَوَلِّ وَجۡهَكَ شَطۡرَ ٱلۡمَسۡجِدِ ٱلۡحَرَامِۚ وَحَيۡثُ مَا كُنتُمۡ فَوَلُّواْ وُجُوهَكُمۡ شَطۡرَهُۥۗ وَإِنَّ ٱلَّذِينَ أُوتُواْ ٱلۡكِتَٰبَ لَيَعۡلَمُونَ أَنَّهُ ٱلۡحَقُّ مِن رَّبِّهِمۡۗ وَمَا ٱللَّهُ
          بِغَٰفِلٍ عَمَّا يَعۡمَلُونَ <span className="font-normal text-3xl">{convertToArabicNumbers("144")}</span>
        </h2>
      </Link>
      <ChapterContainer />
    </>
  );
}
