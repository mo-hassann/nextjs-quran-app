import CHAPTERS_LIST from "@/data/chapters-list.json";
import ChapterCard from "./chapter-card";

export default function ChapterContainer() {
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 justify-items-start P m-3">
      {CHAPTERS_LIST.map((chapter) => (
        <ChapterCard key={chapter.id} id={chapter.id} arabicName={chapter.name} translation={chapter.translation} transliteration={chapter.transliteration} type={chapter.type as "meccan" | "medinan"} versesCount={chapter.total_verses} />
      ))}
    </div>
  );
}
