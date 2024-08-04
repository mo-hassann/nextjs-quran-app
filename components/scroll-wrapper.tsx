"use client";
import UseScrollProgress from "@/hooks/use-scroll-progress";
import { Slot } from "@radix-ui/react-slot";

type props = {
  children: React.ReactNode;
  asChild?: boolean;
};

export const ScrollWrapper = ({ children, asChild }: props) => {
  const { scrollTop, scrollableRef } = UseScrollProgress();
  const Comp = asChild ? Slot : "div";
  return (
    <>
      <div className="fixed top-0 left-0 h-1 bg-primary transition rounded-full dir z-20" style={{ width: `${scrollTop}%` }} />
      <Comp ref={scrollableRef}>{children}</Comp>
    </>
  );
};
