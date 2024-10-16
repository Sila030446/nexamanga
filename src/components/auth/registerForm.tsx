"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useFormState } from "react-dom";
import createUser from "@/app/(auth)/register/register";
import { useRouter } from "next/navigation";
import { Alert } from "../ui/alert";
import { GoAlert } from "react-icons/go";

const RegisterForm = () => {
  const [state, formAction] = useFormState(createUser, { error: {} });
  const router = useRouter();

  if (!state?.error) {
    router.push("/login");
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 items-start">
        <Label htmlFor="username" className="text-base">
          ชื่อผู้ใช้งาน
        </Label>
        <Input
          name="name"
          type="username"
          placeholder="ชื่อผู้ใช้งาน"
          className="w-full h-full  py-3 text-md"
        />
        <p className="text-red-500 text-sm">{state?.error?.name}</p>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <Label htmlFor="email" className="text-base">
          อีเมล
        </Label>
        <Input
          name="email"
          type="email"
          placeholder="อีเมล"
          className="w-full h-full  py-3 text-md"
        />
        <p className="text-red-500 text-sm">{state?.error?.email}</p>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <Label htmlFor="password" className="text-base">
          รหัสผ่าน
        </Label>
        <Input
          name="password"
          type="password"
          placeholder="รหัสผ่าน"
          className="w-full h-full  py-3 text-md"
        />
        <p className="text-red-500 text-sm">{state?.error?.password}</p>
      </div>
      {state?.error?.general && (
        <Alert variant="destructive">
          <div className="flex items-center gap-2 justify-center">
            <GoAlert className="h-4 w-4" />
            <p>{state?.error?.general}</p>
          </div>
        </Alert>
      )}

      <Button
        className="w-full bg-emerald-500 text-white px-4 text-base transition-all duration-300 ease-in-out transform hover:bg-emerald-600 hover:scale-105 active:scale-95"
        type="submit"
        size={"lg"}
      >
        สมัครสมาชิก
      </Button>
    </form>
  );
};

export default RegisterForm;
