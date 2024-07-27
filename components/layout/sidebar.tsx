import Logo from "../logo";

import Navbar from "./navbar";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex-shrink-0 w-[70px] min-h-full flex flex-col items-center py-5">
      <Logo />
      <Navbar />
    </aside>
  );
}
