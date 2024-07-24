"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import useSignIn from "@/client/auth/api/use-sign-in";
import SignInForm from "@/client/auth/components/sign-in-form";
import Link from "next/link";

export default function SignInPage() {
  const singInMutation = useSignIn();

  const isPending = singInMutation.isPending;
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
        <CardDescription>ادخل بريدك الالكتروني وكلمة المرور لاتمام عملية تسجيل الدخول</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm defaultValues={{ email: "", password: "" }} disabled={isPending} onSubmit={(values) => singInMutation.mutate(values)} />
      </CardContent>
      <CardFooter>
        <p className="w-full text-sm text-center">
          لا تملك حساب شخصي؟&nbsp;
          <Link className="hover:underline hover:text-primary" href="/sign-up">
            التسحيل
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
