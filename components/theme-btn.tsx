"use client";

import * as React from "react";
import { MonitorIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function ThemeBtn() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Theme");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-1">
        <DropdownMenuItem className={cn("space-x-1.5", theme === "light" && "bg-muted")} onClick={() => setTheme("light")}>
          <Sun />
          <span className="w-full ltr:text-left rtl:text-right">{t("light")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className={cn("space-x-1.5", theme === "dark" && "bg-muted")} onClick={() => setTheme("dark")}>
          <Moon />
          <span className="w-full ltr:text-left rtl:text-right">{t("dark")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className={cn("space-x-1.5", theme === "system" && "bg-muted")} onClick={() => setTheme("system")}>
          <MonitorIcon />
          <span className="w-full ltr:text-left rtl:text-right">{t("system")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
