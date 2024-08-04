"use client";
import { Input } from "@/components/ui/input";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, type ChangeEvent } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const t = useTranslations("MainLayout.Header");
  const { searchParams, updateSearchParams } = useUpdateSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    updateSearchParams({ search });
  }, [search]);

  return (
    <>
      <div className="sm:flex hidden items-center gap-2 py-1 px-2 rounded-full overflow-hidden border border-muted w-72 h-11 has-[:focus]:ring-2 ring-primary/70">
        <Input onChange={handleInputChange} value={search} className="p-0 px-3 rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0" placeholder={t("search")} />
        <Search />
      </div>

      <div className="sm:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" variant="ghost">
              <Search />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-1.5 mx-2">
            <Input onChange={handleInputChange} value={search} className="p-0 px-3 rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0" placeholder={t("search")} />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
