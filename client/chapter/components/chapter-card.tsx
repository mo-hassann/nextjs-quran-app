import Link from "next/link";
import FavoriteChapter from "./favorite-chapter-action";
import { useLocale, useTranslations } from "next-intl";
import { Dot } from "lucide-react";
import { Locale } from "@/i18n.config";

type props = {
  id: number;
  name: string;
  versesCount: number;
  transliterationName: string;
  type: "meccan" | "medinan";
};

export default function ChapterCard({ id, name, transliterationName, type, versesCount }: props) {
  const t = useTranslations("Components.ChapterCard");
  const locale = useLocale() as Locale;

  return (
    <div className="flex flex-col justify-between h-40 w-full bg-background hover:bg-primary-foreground hover:shadow-md hover:shadow-primary/30 transition-colors p-5 rounded-lg">
      <div className="flex items-center justify-between">
        <span className="bg-primary/10 text-primary text-xs size-6 rounded-full flex items-center justify-center">{id}</span>
        <FavoriteChapter chapterId={id} />
      </div>
      <Link href={`/chapter/${id}/reading`}>
        <h2 className="text-2xl font-semibold">{locale === "ar" ? t("chapter", { name }) : transliterationName}</h2>
        {locale !== "ar" && <h3 className="text-foreground/80 font-semibold text-sm">{t("chapter", { name })}</h3>}
        <div className="flex items-center text-muted-foreground text-sm">
          <p>{t("versesCount", { count: versesCount })}</p>
          <Dot />
          <p>{t(type)}</p>
        </div>
      </Link>
    </div>
  );
}
