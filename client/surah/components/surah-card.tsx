import Link from "next/link";
import FavoriteSurah from "./favorite-surah";

export default function SurahCard() {
  return (
    <div className="flex flex-col gap-8 h-40 w-full bg-background hover:bg-primary-foreground hover:shadow-md hover:shadow-primary/30 transition-colors p-5 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="bg-primary/10 text-primary size-6 rounded-full flex items-center justify-center">1</span>
        <FavoriteSurah />
      </div>
      <Link href={"/surah"}>
        <h2 className="text-2xl font-semibold">سورة الفاتحة</h2>
        <p className="text-muted-foreground text-sm">7 آيات</p>
      </Link>
    </div>
  );
}
