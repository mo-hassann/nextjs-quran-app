import ChaptersSidebar from "@/client/chapter/components/chapters-sidebar";
import SettingsSidebar from "@/client/chapter/components/settings/settings-sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: props) {
  return (
    <div className="flex gap-6">
      <ChaptersSidebar />
      <div className="w-full">{children}</div>
      <SettingsSidebar />
    </div>
  );
}
