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
      <div>
        <Button disabled={increaseDisabled} onClick={() => increase()} className="px-0 py-1.5 h-fit ltr:mr-2 rtl:ml-2" size="sm" variant="ghost">
          <PlusCircle size={18} className="ltr:mr-1 rtl:ml-1" /> {t("zoomIn")}
        </Button>
        <Button disabled={decreaseDisabled} onClick={() => decrease()} className="px-0 py-1.5 h-fit ltr:mr-2 rtl:ml-2" size="sm" variant="ghost">
          <MinusCircle size={18} className="ltr:mr-1 rtl:ml-1" /> {t("zoomOut")}
        </Button>
      </div>
    </div>
  );
}
