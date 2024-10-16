"use client";
import { FaKey, FaUser } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import login from "@/app/(auth)/login/login";
import { useFormState } from "react-dom";
import { Alert } from "../ui/alert";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, { error: "" });
  console.log(state);
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="w-full h-12 relative">
        <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="w-full h-full pl-10 pr-4 py-2 text-md"
          type="email"
          placeholder="อีเมล"
          name="email"
        />
      </div>
      <div className="w-full h-12 relative">
        <FaKey className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <Input
          className="w-full h-full pl-10 pr-4 py-2 text-md"
          type="password"
          placeholder="รหัสผ่าน"
          name="password"
        />
      </div>
      {state?.error && (
        <Alert className="w-full" variant="destructive" title="เกิดข้อผิดพลาด">
          เกิดข้อผิดพลาดเนื่องจาก {state?.error}
        </Alert>
      )}
      <Button
        className="w-full bg-emerald-500 text-white px-4 text-base transition-all duration-300 ease-in-out transform hover:bg-emerald-600 hover:scale-105 active:scale-95"
        type="submit"
        size={"lg"}
      >
        เข้าสู่ระบบ
      </Button>
    </form>
  );
};

export default LoginForm;
