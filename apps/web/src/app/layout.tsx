import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "FigurLedger",
  description: "An Finacial Ledger Application",
};

import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { Toaster } from "sonner";
import { AuthProvider } from "@/providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
