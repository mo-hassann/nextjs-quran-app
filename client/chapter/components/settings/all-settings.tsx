import ReaderSetting from "./reader-setting";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpenText, LibraryBig, Volume2 } from "lucide-react";
import FontsizeSettings from "./fontsize-settings";
import { useLocale, useTranslations } from "next-intl";
import TafseerSetting from "./tafseer-setting";
import { Locale } from "@/i18n.config";

export default function AllSettings() {
  const t = useTranslations("ChapterPage.sidebarSettings");
  const locale = useLocale() as Locale;

  return (
    <div className="w-full">
      <p className="my-2 text-2xl">{t("title")}</p>
      <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline">
            <p>
              <BookOpenText size={18} className="inline-block mr-1" /> {t("readingSettings")}
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <FontsizeSettings />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="hover:no-underline">
            <p>
              <Volume2 size={18} className="inline-block mr-1" /> {t("audioSettings")}
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <ReaderSetting />
          </AccordionContent>
        </AccordionItem>

        {locale === "ar" && (
          <AccordionItem value="item-3">
            <AccordionTrigger className="hover:no-underline">
              <p>
                <LibraryBig size={18} className="inline-block mr-1" /> إعدادات التفسير
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <TafseerSetting />
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}
