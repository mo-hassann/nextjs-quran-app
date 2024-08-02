"use client";
import { useQuranPlayer } from "@/client/verse/hooks/use-quran-player";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AudioLines } from "lucide-react";
import { useTranslations } from "next-intl";
import { AVAILABLE_READERS } from "@/constants";

export default function ReaderSetting() {
  const t = useTranslations("ChapterPage.sidebarSettings");
  const { readerId, setReaderId } = useQuranPlayer();

  return (
    <div className="p-1.5 flex flex-col gap-1.5">
      <div className="flex items-center gap-1">
        <AudioLines className="text-secondary" size={18} /> <span>{t("reader")}</span>
      </div>

      <Select onValueChange={(value) => setReaderId(value)} defaultValue={readerId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t("ReaderSelectPlaceHolder")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {AVAILABLE_READERS.map((reader) => (
              <SelectItem key={reader.id} value={reader.id}>
                {t(`Readers.${reader.name}`)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
