import AllSettings from "./all-settings";

export default function SettingsSidebar() {
  return (
    <div className="sticky top-0 bg-background rounded-md overflow-hidden w-[320px] h-[calc(95vh-60px)] flex-shrink-0 p-4 hidden xl:block">
      <AllSettings />
    </div>
  );
}
