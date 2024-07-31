import useCurVerseId from "@/client/verse/hooks/use-cur-verse-id";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function useScrollToCurVerse(deps?: [any]) {
  const curVerseId = useCurVerseId();

  useEffect(() => {
    if (curVerseId) {
      const element = document.getElementById(curVerseId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [curVerseId, deps]);
}
