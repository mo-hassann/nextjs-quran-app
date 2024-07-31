import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { ScrollWrapper } from "@/components/scroll-wrapper";

type props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: props) {
  return (
    <div className="flex h-full overflow-auto">
      <Sidebar />
      <div className="flex flex-col size-full min-h-full">
        <Header />
        <ScrollWrapper asChild>
          <div className="overflow-auto min-h-[calc(100%-100px)] p-6 w-full bg-muted rounded-3xl">
            <div className="container px-0">{children}</div>
          </div>
        </ScrollWrapper>
      </div>
    </div>
  );
}
