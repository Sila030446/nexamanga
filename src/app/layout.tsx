import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";
import Authenticated from "./(auth)/authenticated";
import { Kanit } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { GoogleTagManager, GoogleAnalytics  } from '@next/third-parties/google'


export const metadata: Metadata = {
  metadataBase: new URL('https://nexamanga.online'),
  title: {
    default: "Nexamanga - อ่านการ์ตูนมังงะออนไลน์ฟรี อัพเดทใหม่ทุกวัน",
    template: "%s | Nexamanga"
  },
  description: "อ่านการ์ตูนมังงะออนไลน์ฟรี อัพเดทใหม่ทุกวัน รวมการ์ตูนดังจากญี่ปุ่น จีน เกาหลี มังงะ มังฮวา การ์ตูนแปลไทย อ่านฟรีไม่มีโฆษณากวนใจ รองรับทุกอุปกรณ์",
  keywords: ["มังงะ", "การ์ตูน", "manga", "manhwa", "manhua", "อ่านการ์ตูน", "การ์ตูนออนไลน์", "มังงะแปลไทย", "การ์ตูนญี่ปุ่น", "การ์ตูนจีน", "การ์ตูนเกาหลี"],
  authors: [{ name: "Nexamanga" }],
  creator: "Nexamanga",
  publisher: "Nexamanga",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Nexamanga - อ่านการ์ตูนมังงะออนไลน์ฟรี อัพเดทใหม่ทุกวัน",
    description: "อ่านการ์ตูนมังงะออนไลน์ฟรี อัพเดทใหม่ทุกวัน รวมการ์ตูนดังจากญี่ปุ่น จีน เกาหลี มังงะ มังฮวา การ์ตูนแปลไทย อ่านฟรีไม่มีโฆษณากวนใจ",
    url: 'https://nexamanga.online',
    siteName: 'Nexamanga',
    images: [
      {
        url: 'https://nexamanga.online/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Nexamanga - อ่านการ์ตูนมังงะออนไลน์',
      }
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nexamanga - อ่านการ์ตูนมังงะออนไลน์ฟรี",
    description: "อ่านการ์ตูนมังงะออนไลน์ฟรี อัพเดทใหม่ทุกวัน รวมการ์ตูนดังจากญี่ปุ่น จีน เกาหลี",
    images: ['https://nexamanga.online/twitter-image.jpg'],
  },
  category: 'entertainment',
};

const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["400", "700"],
  display: 'swap', // Optimize font loading
  preload: true,
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await Authenticated();
  return (
    <html lang="th">
       <GoogleTagManager gtmId="G-RWWHF79G7B" />
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${kanit.className} antialiased`}>
        <Provider authenticated={isAuthenticated}>
          <NextTopLoader color="red" showSpinner={false} />
          {children}
        </Provider>
      </body>
       <GoogleAnalytics gaId="G-RWWHF79G7B" />
    </html>
  );
}