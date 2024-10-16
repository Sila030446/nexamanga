import LoginForm from "@/components/auth/loginForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Divider from "@/components/ui/divider";
import { Anton, Noto_Sans_Thai } from "next/font/google";
import Link from "next/link";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import Authenticated from "../authenticated";
import { redirect } from "next/navigation";

const anton = Anton({ subsets: ["latin"], weight: ["400"] });
const noto = Noto_Sans_Thai({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const LoginPage = () => {
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
              เข้าสู่ระบบด้วยสมาชิก Nexamanga
            </p>
          </div>
        </CardHeader>
        <CardContent className="w-full p-0 flex flex-col gap-4">
          <LoginForm />
          <Divider title="หรือ" />
          <Link href={"http://localhost:8888/auth/google"}>
            <Button
              className="w-full bg-red-500 text-white px-4 text-base transition-all duration-300 ease-in-out transform hover:bg-red-600 hover:scale-105 active:scale-95"
              type="button"
              size={"lg"}
            >
              <FaGoogle className="mr-2 h-5 w-5" />
              สมัคร / เข้าสู่ระบบด้วย Google
            </Button>
          </Link>
        </CardContent>
        <CardFooter className="w-full p-0 flex items-center justify-between">
          <Link href={"/forgot-password"}>
            <Button variant={"link"} className="flex items-center ">
              ลืมรหัสผ่าน?
            </Button>
          </Link>
          <Link href={"/register"}>
            <Button variant={"link"} className="flex items-center ">
              สมัครสมาชิก
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
