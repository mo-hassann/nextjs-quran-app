"use client";
import { getUserLocale, setUserLocale } from "@/lib/locale";
import { Button } from "./ui/button";
import { LanguagesIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export default function SelectLanguage() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () =>
    startTransition(async () => {
      const newLocale = locale === "en" ? "ar" : "en";

      // Set the new locale in a cookie
      await setUserLocale(newLocale);
    });

  return (
    <Button disabled={isPending} variant={"ghost"} onClick={toggleLocale}>
      {locale === "en" ? "العربية" : "English"}
      <LanguagesIcon className="ml-2" size={18} />
    </Button>
  );
}
