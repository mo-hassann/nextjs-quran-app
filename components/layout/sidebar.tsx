import Link from "next/link";
import Logo from "../logo";

import Navbar from "./navbar";

export default function Sidebar() {
  return (
    <aside className="md:flex-shrink-0 md:w-[70px] md:min-h-full flex md:flex-col items-center justify-center py-5 fixed md:static bottom-0 left-0 bg-background flex-row z-20 w-full border-t-2 md:border-none h-[70px] rounded-t-lg md:rounded-t-none">
      <Link href="/">
        <Logo className="hidden md:flex" />
      </Link>
      <Navbar />
    </aside>
  );
}
