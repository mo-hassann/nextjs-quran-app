import ALL_SURAH_LIST from "@/data/all-surah-list.json";
import SurahCard from "./surah-card";

export default function SurahContainer() {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start P m-3">
      {ALL_SURAH_LIST.map((surah) => (
        <SurahCard key={surah.id} id={surah.id} arabicName={surah.name} translation={surah.translation} transliteration={surah.transliteration} type={surah.type as "meccan" | "medinan"} versesCount={surah.total_verses} />
      ))}
    </div>
  );
}
