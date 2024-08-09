"use client";
import { setUserLocale } from "@/lib/locale";
import { useTransition } from "react";
import { MdLanguage } from "react-icons/md";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Locale } from "@/i18n.config";
import { useLocale } from "next-intl";

export default function SelectLanguage() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale() as Locale;

  const changeLocale = (value: string) =>
    startTransition(async () => {
      // Set the new locale in a cookie
      await setUserLocale(value as Locale);
    });

  return (
    <Select disabled={isPending || !locale} defaultValue={locale} onValueChange={(value) => changeLocale(value)}>
      <SelectTrigger className="w-[180px]">
        <MdLanguage size={20} />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="text-center">
        <SelectItem value="ar">العربية</SelectItem>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
        <SelectItem value="tr">Türkçe</SelectItem>
        <SelectItem value="ru">Русский</SelectItem>
      </SelectContent>
    </Select>
  );
}

// <Button disabled={isPending} variant={"ghost"} onClick={toggleLocale}>
//   {locale === "en" ? "العربية" : "English"}
//   <LanguagesIcon className="ml-2" size={18} />
// </Button>
