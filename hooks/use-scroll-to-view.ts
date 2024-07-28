import { useEffect, useState } from "react";

export default function useScrollToView(deps: any[]) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    if (!isScrolled) {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setIsScrolled(true);
        }
      }
    }
  }, [deps, isScrolled]);
}
