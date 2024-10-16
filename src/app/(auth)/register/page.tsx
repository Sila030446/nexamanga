import RegisterForm from "@/components/auth/registerForm";
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
import Authenticated from "../authenticated";
import { redirect } from "next/navigation";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const noto = Noto_Sans_Thai({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const RegisterPage = () => {
  const authenticate = Authenticated();
  if (authenticate) {
    return redirect("/");
  }
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
              สมัครสมาชิกบัญชี Nexamanga
            </p>
          </div>
        </CardHeader>
        <CardContent className="w-full p-0 flex flex-col gap-4">
          <RegisterForm />
        </CardContent>
        <CardFooter className="w-full p-0 flex items-center justify-end">
          <p className="text-sm text-muted-foreground">คลิกเพื่อเข้าสู่ระบบ</p>
          <Link href={"/login"}>
            <Button variant={"link"} className="flex items-center p-1">
              ล็อกอิน
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
