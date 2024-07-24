"use client";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import UseScrollProgress from "@/hooks/use-scrool-progress";

type props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: props) {
  const { scrollTop, scrollableRef } = UseScrollProgress();
  return (
    <div className="flex h-full overflow-auto">
      <Sidebar />
      <div className="flex flex-col size-full min-h-full">
        <Header />
        <div className="overflow-auto min-h-[calc(100%-100px)] p-4 w-full bg-muted rounded-3xl" ref={scrollableRef}>
          <div className="fixed top-0 left-0 h-1 bg-primary transition rounded-full" style={{ width: `${scrollTop}%` }} />
          <div className="container">{children}</div>
        </div>
      </div>
    </div>
  );
}
