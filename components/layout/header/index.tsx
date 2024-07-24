import Notifications from "./notifications";
import SearchBar from "./search-bar";
import UserBar from "./user-bar";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6 flex-shrink-0 h-[75px] shadow-[-20px_4px_20px_-0px_rgba(0,0,0,0.3)] shadow-muted z-10">
      <h1 className="text-2xl font-extrabold">القرآن الكريم</h1>
      <SearchBar />
      <div className="flex items-center gap-2.5">
        <UserBar />
        <Notifications />
      </div>
    </header>
  );
}
