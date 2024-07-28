import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function SearchBar() {
  const t = useTranslations("MainLayout.Header");
  return (
    <div className="flex items-center gap-2 py-1 px-2 rounded-full overflow-hidden border border-muted w-72 h-11 has-[:focus]:ring-2 ring-primary/70">
      <Input className="p-0 px-3 rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0" placeholder={t("search")} />
      <Search />
    </div>
  );
}
