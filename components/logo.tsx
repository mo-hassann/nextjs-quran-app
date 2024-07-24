import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/">
      <div className="size-12 bg-primary rounded-full" />
    </Link>
  );
}
