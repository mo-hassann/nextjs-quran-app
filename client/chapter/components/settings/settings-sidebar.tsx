import { Separator } from "@/components/ui/separator";
import React from "react";
import ReaderSetting from "./reader-setting";
import AppearanceSettings from "./appearance-settings";
import { useTranslations } from "next-intl";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpenText, Volume2 } from "lucide-react";

export default function SettingsSidebar() {
  const t = useTranslations("ChapterPage.sidebarSettings");
  return (
    <div className="sticky top-0 bg-white rounded-md overflow-hidden w-[320px] h-[calc(95vh-60px)] overflow-y-auto flex-shrink-0 p-4">
      <p className="my-2 text-2xl">{t("title")}</p>

      <div className="w-full">
        <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline">
              <p>
                <BookOpenText size={18} className="inline-block mr-1" /> Reading Settings
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <AppearanceSettings />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline">
              <p>
                <Volume2 size={18} className="inline-block mr-1" /> Audio Settings
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
    </div>
  );
}
