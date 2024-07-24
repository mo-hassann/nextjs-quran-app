import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

type props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: props) {
  return (
    <div className="flex h-full overflow-auto">
      <Sidebar />
      <div className="flex flex-col size-full min-h-full">
        <Header />
        <div className="overflow-auto p-4 w-full bg-muted rounded-3xl">
          <div className="container">{children}</div>
        </div>
      </div>
    </div>
  );
}
