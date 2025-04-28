import { Sidebar } from "@/components/sidebar";
import { FileTreeProvider } from "@/contexts/FileTreeContext";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Notes",
  description: "The most basic markdown notes app.",
};

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto_mono.className}>
        <main className="mx-auto grid h-screen w-screen grid-cols-[18rem_1fr] bg-neutral-950">
          <FileTreeProvider>
            <Sidebar />
            {children}
          </FileTreeProvider>
        </main>
      </body>
    </html>
  );
}
