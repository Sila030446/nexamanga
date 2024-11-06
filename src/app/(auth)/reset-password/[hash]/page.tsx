import ResetPasswordForm from "@/components/auth/resetPasswordForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Anton, Noto_Sans_Thai } from "next/font/google";
import Link from "next/link";
import React from "react";

// Fonts
const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const noto = Noto_Sans_Thai({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

// Metadata function for Next.js
export function generateMetadata() {
  return {
    title: "เปลี่ยนรหัสผ่าน",
    description: "กรุณากรอกอีเมลของคุณเพื่อรับลิงก์การตั้งรหัสผ่านใหม่.",
    openGraph: {
      title: "เปลี่ยนรหัสผ่าน - Nexamanga",
      description: "กรุณากรอกอีเมลของคุณเพื่อรับลิงก์การตั้งรหัสผ่านใหม่.",
      url: "/forgot-password",
      siteName: "Nexamanga",
    },
    twitter: {
      card: "summary_large_image",
      title: "เปลี่ยนรหัสผ่าน - Nexamanga",
      description: "กรุณากรอกอีเมลของคุณเพื่อรับลิงก์การตั้งรหัสผ่านใหม่.",
    },
  };
}

const ResetPasswordPage = ({ params }: { params: { hash: string } }) => {
  return (
    <div
      className={`w-full h-screen flex items-center justify-center ${noto.className}`}
      style={{
        backgroundImage:
          "url('https://images3.alphacoders.com/135/1352229.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-screen backdrop-blur-xl bg-black/50 relative"></div>
      <Card className="absolute w-full md:w-[512px] p-8 text-center flex flex-col gap-y-4">
        <CardHeader className="w-full p-0 mb-5">
          <div className="flex flex-col gap-5 items-center justify-center">
            <Link href={"/"}>
              <div className="cursor-pointer">
                <h1
                  className={`text-4xl font-bold tracking-[2px] ${anton.className}`}
                >
                  Nexamanga
                </h1>
              </div>
            </Link>
            <div className="h-[1px] w-full bg-muted-foreground"></div>
            <p className="font-semibold text-lg text-muted-foreground">
              เปลี่ยนรหัสผ่าน
            </p>
          </div>
        </CardHeader>
        <CardContent className="w-full p-0 flex flex-col gap-4">
          <ResetPasswordForm hash={params.hash} />
        </CardContent>
        <CardFooter className="w-full p-0 flex items-center justify-between">
          <Link href={"/login"}>
            <Button variant={"link"} className="flex items-center ">
              ล็อกอิน
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
