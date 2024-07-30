import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function useScrollToCurVerse(deps?: [any]) {
  const searchParams = useSearchParams();
  const curVerseId = searchParams.get("verse");

  useEffect(() => {
    if (curVerseId) {
      const element = document.getElementById(curVerseId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [curVerseId, deps]);
}
