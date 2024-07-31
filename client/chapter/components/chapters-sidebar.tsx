"use client";
import CHAPTERS_LIST from "@/data/chapters-list.json";
import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function ChaptersSidebar() {
  const { id: curChapterId }: { id: string } = useParams();
  const pathName = usePathname();
  const curSection = pathName.includes("/reading") ? "reading" : "translation";
  const t = useTranslations("Components.ChapterCard");
  const locale = useLocale() as Locale;

  return (
    <div className="w-[320px] h-[calc(95vh-120px)] flex-shrink-0 px-1 sticky top-0">
      <div className="w-11/12 p-1 flex items-center gap-2 bg-slate-200 rounded-sm mb-3">
        <Link className={cn("block rounded-sm text-center p-1.5 w-full transition-all", curSection === "reading" && "bg-background")} href="reading">
          القراءة
        </Link>
        <Link className={cn("block rounded-sm text-center p-1.5 w-full transition-all", curSection === "translation" && "bg-background")} href="translation">
          تدبر الايات
        </Link>
      </div>

      <div className="flex flex-col gap-2.5 h-full overflow-y-scroll">
        {CHAPTERS_LIST.map((chapter) => {
          const isActive = chapter.id === +curChapterId;

          return (
            <Link href={`/chapter/${chapter.id}/${curSection}`} key={chapter.id} className={cn("flex items-center w-full h-[90px] flex-shrink-0 rounded-sm p-2 bg-background", isActive && "bg-primary/90 text-white")}>
              <div className="flex items-center gap-2">
                <span className={cn("bg-primary/80 text-white size-6 rounded-full flex items-center justify-center mt-1.5 self-start text-xs", isActive && "bg-white text-primary")}>{chapter.id}</span>
                <div>
                  <p className="text-lg">{locale === "ar" ? t("verse", { name: chapter.name[locale] }) : chapter.transliterationName}</p>
                  {locale !== "ar" && <p className={cn("text-sm font-semibold text-muted-foreground", isActive && "text-muted")}>{t("verse", { name: chapter.name[locale] })}</p>}
                  <p className={cn("text-sm text-muted-foreground/70", isActive && "text-muted")}>{chapter.totalVerses} verse</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
