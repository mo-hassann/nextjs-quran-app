import { useTranslations } from "next-intl";

export default function NoData() {
  const t = useTranslations("General");
  return (
    <div className="flex justify-center py-7">
      <p className="text-xl">{t("noData")}</p>
    </div>
  );
}
