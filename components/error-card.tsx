import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function ErrorCard() {
  const router = useRouter();
  return (
    <div className="p-3 mt-7 mx-auto flex items-center flex-col">
      <h1 className="text-7xl font-bold">Error</h1>
      <p className="text-muted-foreground mb-2 text-xl">Something went wrong</p>
      <Button onClick={() => router.refresh()}>Retry</Button>
    </div>
  );
}
