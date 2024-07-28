"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import SignUpForm from "@/client/auth/components/sign-up-form";
import useSignUp from "@/client/auth/api/use-sign-up";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function SignUpPage() {
  const singUpMutation = useSignUp();
  const t = useTranslations("SignUpPage");

  const isPending = singUpMutation.isPending;
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm defaultValues={{ name: "", email: "", password: "", confirmPassword: "" }} disabled={isPending} onSubmit={(values) => singUpMutation.mutate(values)} />
      </CardContent>
      <CardFooter>
        <p className="w-full text-sm text-center">
          {t("haveAccount")}&nbsp;
          <Link className="hover:underline text-primary" href="/sign-in">
            {t("signIn")}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
