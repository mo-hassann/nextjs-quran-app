"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AudioLines } from "lucide-react";
import { AVAILABLE_TAFSEER } from "@/constants";
import { useTafseer } from "@/client/verse/hooks/use-tafseer";

export default function TafseerSetting() {
  const { tafseerId, setTafseerId } = useTafseer();

  return (
    <div className="p-1.5 flex flex-col gap-1.5">
      <div className="flex items-center gap-1">
        <AudioLines className="text-secondary" size={18} /> <span>التفسير</span>
      </div>

      <Select onValueChange={(value) => setTafseerId(+value)} defaultValue={`${tafseerId}`}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={"اختيار التفسير"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {AVAILABLE_TAFSEER.map((tafseer) => (
              <SelectItem key={tafseer.id} value={`${tafseer.id}`}>
                {tafseer.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
