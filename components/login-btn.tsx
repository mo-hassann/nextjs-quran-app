"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();
  return <Button onClick={() => router.push("/sign-in")}>تسجيل الدخول</Button>;
}
