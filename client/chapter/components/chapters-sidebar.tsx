"use client";
import CHAPTERS_LIST from "@/data/chapters-list.json";
import useScrollToElement from "@/hooks/use-scroll-to-element";
import { Locale } from "@/i18n.config";
import { cn } from "@/lib/utils";
import { BookOpenText, Captions } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import MobileSettingsSidebar from "./mobile-settings-sidebar";

export default function ChaptersSidebar() {
  const chapterList = CHAPTERS_LIST;
  const { id: curChapterId }: { id: string } = useParams();
  const pathName = usePathname();
  const curSection = pathName.includes("/reading") ? "reading" : "learning";
  const t = useTranslations("Components.ChapterCard");
  const locale = useLocale() as Locale;

  useScrollToElement(`list_${curChapterId}`);

  return (
    <div className="lg:w-[320px] w-fit h-[calc(95vh-120px)] flex-shrink-0 px-1 sticky top-0 flex items-center flex-col lg:block">
      <div className="flex items-center justify-center gap-1 flex-col lg:flex-row">
        <div className="w-11/12 p-1 flex items-center gap-2 bg-accent rounded-sm mb-3 lg:rtl:ml-auto lg:ltr:mr-auto flex-col lg:flex-row text-sm lg:text-base">
          <Link className={cn("rounded-sm flex rtl:flex-row ltr:flex-row-reverse items-center justify-center gap-1 lg:p-1.5 p-0.5 w-full transition-all", curSection === "reading" && "bg-background")} href="reading">
            <span className="hidden lg:inline-block">{t("reading")}</span> <BookOpenText className="size-5" />
          </Link>
          <Link className={cn("rounded-sm flex rtl:flex-row ltr:flex-row-reverse items-center justify-center gap-1 lg:p-1.5 p-0.5 w-full transition-all", curSection === "learning" && "bg-background")} href="learning">
            <span className="hidden lg:inline-block">{t("learning")}</span> <Captions className="size-5" />
          </Link>
        </div>

        <MobileSettingsSidebar />
      </div>

      <div className="hidden lg:flex flex-col gap-2.5 h-full overflow-y-scroll ltr:pr-2 rtl:pl-2">
        {chapterList.map((chapter) => {
          const isActive = chapter.id === +curChapterId;

          return (
            <Link id={`list_${chapter.id}`} href={`/chapter/${chapter.id}/${curSection}`} scroll={false} key={chapter.id} className={cn("flex items-center w-full h-[90px] flex-shrink-0 rounded-sm p-2 bg-background", isActive && "bg-primary/90 text-white")}>
              <div className="flex items-center gap-2">
                <span className={cn("bg-primary/80 text-white size-6 rounded-full flex items-center justify-center mt-1.5 self-start text-xs", isActive && "bg-white text-primary")}>{chapter.id}</span>
                <div>
                  <p className="text-lg">{locale === "ar" ? t("chapter", { name: chapter.name[locale] }) : chapter.transliterationName}</p>
                  {locale !== "ar" && <p className={cn("text-sm font-semibold text-muted-foreground", isActive && "text-white/85")}>{t("chapter", { name: chapter.name[locale] })}</p>}
                  <p className={cn("text-sm text-muted-foreground/70", isActive && "text-white/80")}>{chapter.totalVerses} verse</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
