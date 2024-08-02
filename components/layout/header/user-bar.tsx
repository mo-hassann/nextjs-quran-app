"use client";
import SignInBtn from "@/client/auth/components/sign-in-btn";
import Spinner from "@/components/spinner";
import UserAvatar from "@/components/user-avatar";
import { useSession } from "@/hooks/use-session";
import { ChevronDownIcon, Verified } from "lucide-react";

export default function UserBar() {
  const { session, status } = useSession();
  const user = session?.user;

  if (status === "pending") return <Spinner className="w-60" />;

  if (!user) return <SignInBtn />;

  return (
    <div className="flex items-center justify-between gap-1 w-60 h-[3.2rem] rounded-full px-1.5 border border-muted hover:bg-muted/20 cursor-pointer">
      <UserAvatar className="size-11" fullBackText={user?.name} image={user?.image} />
      <p>{user.name}</p>
      <Verified />
    </div>
  );
}
