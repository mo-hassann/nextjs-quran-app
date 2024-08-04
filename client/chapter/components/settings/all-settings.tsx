import ReaderSetting from "./reader-setting";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpenText, Volume2 } from "lucide-react";
import FontsizeSettings from "./fontsize-settings";
import { useTranslations } from "next-intl";

export default function AllSettings() {
  const t = useTranslations("ChapterPage.sidebarSettings");
  return (
    <div className="w-full">
      <p className="my-2 text-2xl">{t("title")}</p>
      <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:no-underline">
            <p>
              <BookOpenText size={18} className="inline-block mr-1" /> {t("readingSettings")}
            </p>
          </AccordionTrigger>
          <AccordionContent>
            {/* <AppearanceSettings /> */}
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
      </Accordion>

      {/* <Separator className="my-2" />


        <Separator className="my-2" /> */}
    </div>
  );
}
