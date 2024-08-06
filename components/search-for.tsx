import { useTranslations } from "next-intl";
import React from "react";

export default function SearchFor({ text }: { text: string }) {
  const t = useTranslations("General");
  return <p className="text-xl w-full col-span-full">{t("searchFor", { text })}</p>;
}
