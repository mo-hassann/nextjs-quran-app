"use client";
import { Button } from "@/components/ui/button";
import { FileText, MinusCircle, PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFontsize } from "../../hooks/use-fontsize";

export default function FontsizeSettings() {
  const t = useTranslations("ChapterPage.sidebarSettings");
  const { increase, decrease, decreaseDisabled, increaseDisabled } = useFontsize();

  return (
    <div className="p-1.5 space-y-1">
      <div className="flex items-center gap-1">
        <FileText className="text-secondary" size={18} /> <span>{t("fontSize")}</span>
      </div>
      <div className="space-x-2">
        <Button disabled={increaseDisabled} onClick={() => increase()} className="p-0.5" size="sm" variant="ghost">
          <PlusCircle className="mr-1" /> {t("zoomIn")}
        </Button>
        <Button disabled={decreaseDisabled} onClick={() => decrease()} className="p-0.5" size="sm" variant="ghost">
          <MinusCircle className="mr-1" /> {t("zoomOut")}
        </Button>
      </div>
    </div>
  );
}
