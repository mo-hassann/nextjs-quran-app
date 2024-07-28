"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function SignInBtn() {
  const router = useRouter();
  const t = useTranslations("SignInPage");
  return (
    <Button variant="default" onClick={() => router.push("/sign-in")}>
      {t("button")}
    </Button>
  );
}
