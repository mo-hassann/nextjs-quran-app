import { IoBook, IoBookmark, IoBookmarkOutline, IoBookOutline, IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: IoBookOutline,
    activeIcon: IoBook,
  },
  {
    id: 2,
    name: "Favorites",
    path: "/favorites",
    icon: AiOutlineHeart,
    activeIcon: AiFillHeart,
  },
  {
    id: 3,
    path: "/bookmarks",
    name: "Bookmarks",
    icon: IoBookmarkOutline,
    activeIcon: IoBookmark,
  },
];

export default function Navbar() {
  const curPath = usePathname();
  return (
    <nav className="flex flex-col justify-between items-center h-full py-5 text-[1.7rem]">
      <div className="flex items-center flex-col gap-3">
        {navItems.map(({ id, icon: Icon, path, name, activeIcon: ActiveIcon }) => {
          const isActive = (curPath.startsWith(path) && path !== "/") || curPath === path;

          return (
            <Link className={cn(isActive && "text-primary")} key={id} href={path}>
              {isActive ? <ActiveIcon /> : <Icon />}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center flex-col gap-3">
        <IoSettingsOutline />
        <IoExitOutline />
      </div>
    </nav>
  );
}
