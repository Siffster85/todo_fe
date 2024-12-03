import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Lists from "./components/lists";

const font = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To-Do List",
  description: "A To-Do List Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="bg-gray-200 flex flex-col justify-center items-center h-full min-h-screen">
        <Header />
        <Lists />
        </div>
      </body>
    </html>
  );
}
