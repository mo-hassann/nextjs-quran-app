"use client";

import { Button } from "@/components/ui/button";
import useSignOut from "../api/use-sign-out";

type props = {
  children: React.ReactNode;
};

export default function SignOutBtn({ children }: props) {
  const signOutMutation = useSignOut();
  const isPending = signOutMutation.isPending;
  return (
    <button disabled={isPending} onClick={() => signOutMutation.mutate({})}>
      {children}
    </button>
  );
}
