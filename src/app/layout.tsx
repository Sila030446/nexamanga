import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";
import Authenticated from "./(auth)/authenticated";
import { Kanit } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Nexamanga อ่าน Manga ออนไลน์",
  description:
    "อ่าน เขียน แปล นิยายและการ์ตูนยุคใหม่ทุกที่ทุกเวลา อัปเดตต่อเนื่องทุกวัน คลังนิยายและการ์ตูนที่ใหญ่ที่สุด นิยายจีน นิยายเกาหลี การ์ตูนจีน การ์ตูนเกาหลี มังงะ มังฮวา หลากหลายเรื่อง หลากหลายอารมณ์",
};

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["400", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await Authenticated();
  return (
    <html lang="en">
      <body className={`antialiased ${kanit.className}`}>
        <Analytics />
        <Provider authenticated={isAuthenticated}>
          <NextTopLoader />
          {children}
        </Provider>
      </body>
    </html>
  );
}
