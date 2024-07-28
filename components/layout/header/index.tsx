import { getTranslations } from "next-intl/server";
import Notifications from "./notifications";
import SearchBar from "./search-bar";
import UserBar from "./user-bar";
import SelectLanguage from "@/components/select-Language";

export default async function Header() {
  const t = await getTranslations("MainLayout.Header");
  return (
    <header className="flex items-center justify-between p-6 flex-shrink-0 h-[75px] shadow-[-20px_4px_20px_-0px_rgba(0,0,0,0.3)] shadow-muted ltr:shadow-[50px_6px_20px_-0px_rgba(0,0,0,0.3)] ltr:shadow-muted z-10">
      <h1 className="text-2xl font-extrabold">{t("title")}</h1>
      <SearchBar />
      <div className="flex items-center gap-2.5">
        <SelectLanguage />
        <UserBar />
        <Notifications />
      </div>
    </header>
  );
}
