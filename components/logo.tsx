import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("size-12 bg-primary rounded-full flex items-center justify-center text-lg font-bold", className)}>
      <Image width={25} height={25} src="/logo.png" alt="logo" />
    </div>
  );
}
