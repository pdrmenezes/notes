import type { Metadata } from "next";
import "./globals.css";
import { roboto_mono } from "@/lib/fonts";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Notes",
  description: "The most basic markdown notes app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto_mono.className}>
        <main className="mx-auto grid h-screen w-screen grid-cols-[18rem_1fr] bg-neutral-950">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
