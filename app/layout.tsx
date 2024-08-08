import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import ModelProvider from "@/providers/model-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const ReadexPro = Readex_Pro({ subsets: ["arabic", "latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("HomePageMetaData");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <body className={ReadexPro.className}>
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
              <Toaster />
              <ModelProvider />
            </ThemeProvider>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
