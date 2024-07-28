import SettingsSidebar from "@/client/chapter/components/settings-sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: props) {
  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div>
          <Link href="reading">القراءة</Link>
          <Link href="translation">تدبر الايات</Link>
        </div>
        <Link href="/" className="size-9 flex items-center justify-center rounded-full hover:bg-background/40">
          <ArrowLeft />
        </Link>
      </div>
      <div className="flex gap-3">
        <div className="w-full">{children}</div>
        <SettingsSidebar />
      </div>
    </div>
  );
}
