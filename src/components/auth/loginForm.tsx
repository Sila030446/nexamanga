"use client";

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { login } from "@/app/(auth)/login/login";
import { FormState } from "@/lib/type";
import { FaUser } from "react-icons/fa";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/custom/PasswordInput";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";

const initialState: FormState = {
  error: {
    email: undefined,
    password: undefined,
  },
};

const LoginForm = () => {
  const router = useRouter();
  const [state, formAction] = useFormState(login, initialState);

  // Handle successful login
  useEffect(() => {
    if (state.success) {
      router.push("/dashboard"); // Redirect after successful login
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="w-full h-12 relative">
          <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          <Input
            className="w-full h-full pl-10 pr-4 py-2 text-md"
            type="email"
            placeholder="อีเมล"
            name="email"
            required
          />
        </div>
        {state?.error?.email && (
          <p className="text-red-500 text-sm my-1">{state.error.email[0]}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <PasswordInput
          className="w-full h-12"
          name="password"
          placeholder="รหัสผ่าน"
          required
        />
        {state?.error?.password && (
          <p className="text-red-500 text-sm my-1">{state.error.password[0]}</p>
        )}
      </div>

      {state?.message && (
        <Alert className="w-full" variant="destructive" title="เกิดข้อผิดพลาด">
          {state.message}
        </Alert>
      )}

      <Button
        className="w-full bg-emerald-500 text-white px-4 text-base transition-all duration-300 ease-in-out transform hover:bg-emerald-600 hover:scale-105 active:scale-95"
        type="submit"
        size="lg"
      >
        เข้าสู่ระบบ
      </Button>
    </form>
  );
};

export default LoginForm;
