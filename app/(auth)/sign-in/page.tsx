"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import useSignIn from "@/client/auth/api/use-sign-in";
import SignInForm from "@/client/auth/components/sign-in-form";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SignInPage() {
  const singInMutation = useSignIn();
  const t = useTranslations("SignInPage");

  const isPending = singInMutation.isPending;
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm defaultValues={{ email: "", password: "" }} disabled={isPending} onSubmit={(values) => singInMutation.mutate(values)} />
      </CardContent>
      <CardFooter>
        <p className="w-full text-sm text-center">
          {t("noAccount")}&nbsp;
          <Link className="hover:underline text-primary" href="/sign-up">
            {t("signUp")}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
