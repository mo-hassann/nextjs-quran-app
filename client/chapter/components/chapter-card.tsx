import Link from "next/link";
import FavoriteChapter from "./favorite-chapter-action";

type props = {
  id: number;
  arabicName: string;
  versesCount: number;
  translation: string;
  transliteration: string;
  type: "meccan" | "medinan";
};

export default function ChapterCard({ id, arabicName, translation, transliteration, type, versesCount }: props) {
  return (
    <div className="flex flex-col gap-8 h-40 w-full bg-background hover:bg-primary-foreground hover:shadow-md hover:shadow-primary/30 transition-colors p-5 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="bg-primary/10 text-primary size-6 rounded-full flex items-center justify-center">{id}</span>
        <FavoriteChapter />
      </div>
      <Link href={`/chapter/${id}/reading`}>
        <h2 className="text-2xl font-semibold">سورة {arabicName}</h2>
        <p className="text-muted-foreground text-sm">
          {versesCount} {versesCount <= 10 ? "آيات" : "آية"}
        </p>
      </Link>
    </div>
  );
}
