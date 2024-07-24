import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type props = {
  className?: string;
};

export default function Spinner({ className }: props) {
  return <Loader2 className={cn("animate-spin", className)} />;
}
