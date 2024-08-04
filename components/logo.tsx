import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return <div className={cn("size-12 bg-primary rounded-full", className)} />;
}
