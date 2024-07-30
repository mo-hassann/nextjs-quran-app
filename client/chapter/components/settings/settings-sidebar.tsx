import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Palette, Settings } from "lucide-react";
import React from "react";
import ReaderSetting from "./reader-setting";
import AppearanceSettings from "./appearance-settings";
import { useTranslations } from "next-intl";

export default function SettingsSidebar() {
  const t = useTranslations("ChapterPage.sidebarSettings");
  return (
    <div className="sticky top-0 bg-white rounded-md overflow-hidden w-[300px] h-full min-h-[800px] flex-shrink-0">
      <div className="w-full bg-primary text-background flex items-center gap-1.5 p-2">
        <Settings size={21} />
        <span>{t("title")}</span>
      </div>

      <div className="size-full p-2">
        <AppearanceSettings />

        <Separator className="my-2" />

        <ReaderSetting />

        <Separator className="my-2" />
      </div>
    </div>
  );
}
