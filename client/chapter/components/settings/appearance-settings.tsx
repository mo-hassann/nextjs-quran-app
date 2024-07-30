import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function AppearanceSettings() {
  const t = useTranslations("ChapterPage.sidebarSettings");
  return (
    <div className="p-1.5 space-y-1">
      <div className="flex items-center gap-1">
        <Palette className="text-secondary" size={18} /> <span>{t("appearance")}</span>
      </div>
      <div>
        <Button size="sm" variant="secondary">
          test
        </Button>
        <Button size="sm" variant="secondary">
          test
        </Button>
      </div>
    </div>
  );
}
