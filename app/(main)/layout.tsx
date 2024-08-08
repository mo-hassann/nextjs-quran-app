import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { ScrollWrapper } from "@/components/scroll-wrapper";

type props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: props) {
  return (
    <div className="flex h-full overflow-y-auto overflow-x-hidden">
      <Sidebar />
      <div className="flex flex-col size-full min-h-full overflow-x-hidden">
        <Header />
        <ScrollWrapper asChild>
          <div className="overflow-auto min-h-[calc(100%-100px)] md:p-6 px-2.5 py-5 w-full bg-muted rounded-none md:rounded-3xl overflow-x-hidden pb-20 pb:mb-0">{children}</div>
        </ScrollWrapper>
      </div>
    </div>
  );
}
