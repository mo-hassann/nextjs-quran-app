import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";

const ReadexPro = Readex_Pro({ subsets: ["arabic", "latin"] });

export const metadata: Metadata = {
  title: "قرآني",
  description: "موقع القرآن الكريم",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html /* className="dark" */ dir="rtl" lang="ar">
      <body className={ReadexPro.className}>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
