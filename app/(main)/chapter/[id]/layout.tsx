"use client";
import ChaptersSidebar from "@/client/chapter/components/chapters-sidebar";
import SettingsSidebar from "@/client/chapter/components/settings/settings-sidebar";
import { useFontsize } from "@/client/chapter/hooks/use-fontsize";
import useScreenSize from "@/hooks/use-screen-size";
import useSessionTracker from "@/hooks/use-session-tracker";
import { useEffect } from "react";

type props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: props) {
  const { set } = useFontsize();
  const { isSm, isMd, is2xlg } = useScreenSize();

  useSessionTracker();

  useEffect(() => {
    if (is2xlg) set("large");
    else if (isMd) set("medium");
    else if (isSm) set("small");
    else set("default");
  }, [isSm, isMd, is2xlg, set]);

  return (
    <div className="flex md:gap-6 gap-0">
      <ChaptersSidebar />
      <div className="w-full">{children}</div>
      <SettingsSidebar />
    </div>
  );
}
