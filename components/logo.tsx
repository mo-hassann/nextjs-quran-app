import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/">
      <div className={cn("size-12 bg-primary rounded-full", className)} />
    </Link>
  );
}
