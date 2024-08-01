import useCurVerseId from "@/client/verse/hooks/use-cur-verse-id";
import { useEffect } from "react";

export default function useScrollToElement(elementId?: string, deps?: [any]) {
  useEffect(() => {
    if (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [elementId, deps]);
}
