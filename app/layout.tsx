import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

const inter = Vazirmatn({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "اجاره ویلا با جاباما در سراسر کشور",
  description: "اجاره ویلا با جاباما در سراسر کشور",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <main className="min-h-screen Container">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
