import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";
import Authenticated from "./(auth)/authenticated";
import { Noto_Sans_Thai } from "next/font/google";

export const metadata: Metadata = {
  title: "Nexamanga อ่าน Manga ออนไลน์",
  description:
    "อ่าน เขียน แปล นิยายและการ์ตูนยุคใหม่ทุกที่ทุกเวลา อัปเดตต่อเนื่องทุกวัน คลังนิยายและการ์ตูนที่ใหญ่ที่สุด นิยายจีน นิยายเกาหลี การ์ตูนจีน การ์ตูนเกาหลี มังงะ มังฮวา หลากหลายเรื่อง หลากหลายอารมณ์ ขับเคลื่อนและพัฒนาโดยชุมชน 100%",
};

const nato = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "700", "900"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await Authenticated();
  return (
    <html lang="en">
      <body className={`antialiased ${nato.className}`}>
        <Provider authenticated={isAuthenticated}>{children}</Provider>
      </body>
    </html>
  );
}
