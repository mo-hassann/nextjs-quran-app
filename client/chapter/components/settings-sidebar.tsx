import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Palette, Settings } from "lucide-react";
import React from "react";

export default function SettingsSidebar() {
  return (
    <div className="sticky top-0 bg-white rounded-md overflow-hidden w-[300px] h-full min-h-[800px] flex-shrink-0">
      <div className="w-full bg-primary text-background flex items-center gap-1.5 p-2">
        <Settings size={21} />
        <span>الاعدادات</span>
      </div>

      <div className="size-full p-2">
        <div className="p-1.5 space-y-1">
          <div className="flex items-center gap-1">
            <Palette className="text-secondary" size={18} /> <span>المظهر</span>
          </div>
          <div>
            <Button size="sm" variant="secondary">
              test
            </Button>
            <Button size="sm" variant="secondary">
              test
            </Button>
          </div>
        </div>

        <Separator className="my-2" />

        <div className="p-1.5 space-y-1">
          <div className="flex items-center gap-1">
            <Palette className="text-secondary" size={18} /> <span>المظهر</span>
          </div>
          <div>
            <Button size="sm" variant="secondary">
              test
            </Button>
            <Button size="sm" variant="secondary">
              test
            </Button>
          </div>
        </div>

        <Separator className="my-2" />
      </div>
    </div>
  );
}
