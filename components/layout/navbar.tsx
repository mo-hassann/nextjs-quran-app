"use client";
import { IoBook, IoBookmark, IoBookmarkOutline, IoBookOutline, IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import SignOutBtn from "@/client/auth/components/sign-out-btn";
import { useTranslations } from "next-intl";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Navbar() {
  const t = useTranslations("MainLayout.Navbar");
  const navItems = [
    {
      id: 1,
      name: t("home"),
      path: "/",
      icon: IoBookOutline,
      activeIcon: IoBook,
    },
    {
      id: 2,
      name: t("favorites"),
      path: "/favorites",
      icon: AiOutlineHeart,
      activeIcon: AiFillHeart,
    },
    {
      id: 3,
      name: t("bookmarks"),
      path: "/bookmarks",
      icon: IoBookmarkOutline,
      activeIcon: IoBookmark,
    },
  ];

  const curPath = usePathname();

  return (
    <nav className="flex flex-col justify-between items-center h-full py-5 text-[1.7rem]">
      <TooltipProvider delayDuration={700}>
        <div className="flex items-center flex-col gap-3">
          {navItems.map(({ id, icon: Icon, path, name, activeIcon: ActiveIcon }) => {
            const isActive = (curPath.startsWith(path) && path !== "/") || curPath === path;

            return (
              <Tooltip key={id}>
                <TooltipTrigger>
                  <Link className={cn(isActive && "text-primary")} href={path}>
                    {isActive ? <ActiveIcon /> : <Icon />}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>{name}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
        <div className="flex items-center flex-col gap-3">
          <Tooltip>
            <TooltipTrigger>
              <IoSettingsOutline />
            </TooltipTrigger>
            <TooltipContent>{t("settings")}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <SignOutBtn>
                <IoExitOutline />
              </SignOutBtn>
            </TooltipTrigger>
            <TooltipContent>{t("signOut")}</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </nav>
  );
}
