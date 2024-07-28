import React, { useEffect, useRef, useState } from "react";

export default function UseScrollProgress() {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = () => {
    const element = scrollableRef.current;
    if (element) {
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const scrolled = (element.scrollTop / scrollHeight) * 100;
      setScrollTop(scrolled);
    }
  };

  useEffect(() => {
    const element = scrollableRef.current;
    if (element) {
      element.addEventListener("scroll", onScroll);
      return () => element.removeEventListener("scroll", onScroll);
    }
  }, []);

  return { scrollTop, scrollableRef };
}
