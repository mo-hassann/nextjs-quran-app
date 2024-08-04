import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AllSettings from "./settings/all-settings";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobileSettingsSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild className="xl:hidden mb-3">
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
