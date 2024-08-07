import { getTranslations } from "next-intl/server";
import SearchBar from "./search-bar";
import UserBar from "./user-bar";
import SelectLanguage from "@/components/select-Language";
import UserAvatar from "@/components/user-avatar";
import { auth } from "@/auth";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Logo from "@/components/logo";
import Link from "next/link";
import SignInBtn from "@/client/auth/components/sign-in-btn";
import { ThemeBtn } from "@/components/theme-btn";

export default async function Header() {
  const t = await getTranslations("MainLayout.Header");
  const session = await auth();
  return (
    <header className="flex items-center sm:justify-between gap-3 p-6 flex-shrink-0 h-[75px] shadow-[-20px_4px_20px_-0px_rgba(0,0,0,0.3)] shadow-muted ltr:shadow-[50px_6px_20px_-0px_rgba(0,0,0,0.3)] ltr:shadow-muted z-10">
      <Link href="/">
        <h1 className="text-2xl font-extrabold md:block hidden">{t("title")}</h1>
      </Link>

      <Link className="md:hidden block ltr:mr-auto rtl:ml-auto sm:mr-0" href="/">
        <Logo />
      </Link>

      <SearchBar />
      <div className="lg:flex hidden items-center gap-2.5">
        <SelectLanguage />
        <UserBar />
        <ThemeBtn />
      </div>

      <div className="lg:hidden">
        {session ? (
          <Popover>
            <PopoverTrigger>
              <UserAvatar fullBackText={session?.user?.name} />
            </PopoverTrigger>
            <PopoverContent className="space-y-2">
              <UserBar />
              <div className="flex items-center gap-2 justify-center">
                <SelectLanguage />
                <ThemeBtn />
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <SignInBtn />
        )}
      </div>
    </header>
  );
}
