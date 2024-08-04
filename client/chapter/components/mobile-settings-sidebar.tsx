import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import SettingsSidebar from "./settings/settings-sidebar";
import AllSettings from "./settings/all-settings";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobileSettingsSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button className="p-0 size-7" variant="secondary" size="icon">
          <Settings size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <AllSettings />
      </SheetContent>
    </Sheet>
  );
}
