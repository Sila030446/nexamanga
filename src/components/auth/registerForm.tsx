"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useFormState, useFormStatus } from "react-dom";
import createUser from "@/app/(auth)/register/register";
import { Alert } from "../ui/alert";
import { GoAlert } from "react-icons/go";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PasswordInput } from "../ui/custom/PasswordInput";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full bg-emerald-500 text-white px-4 text-base transition-all duration-300 ease-in-out transform hover:bg-emerald-600 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
      type="submit"
      size="lg"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>กำลังดำเนินการ...</span>
        </div>
      ) : (
        "สมัครสมาชิก"
      )}
    </Button>
  );
};

const RegisterForm = () => {
  const router = useRouter();
  const [state, formAction] = useFormState(createUser, { error: {} });
  const { pending } = useFormStatus();
  useEffect(() => {
    if (state?.success) {
      toast.success("สมัครสมาชิกสําเร็จ! โปรดตรวจสอบกล่องจดหมายของคุณ.");
      router.push("/login");
    }
  }, [state?.success, router]);

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
          className="w-full h-full py-3 text-md"
          disabled={pending}
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
          className="w-full h-full py-3 text-md"
          disabled={pending}
        />
        <p className="text-red-500 text-sm">{state?.error?.email}</p>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <Label htmlFor="password" className="text-base">
          รหัสผ่าน
        </Label>
        <PasswordInput
          showIcon={false}
          name="password"
          placeholder="รหัสผ่าน"
        />
        {state?.error?.password && (
          <div className="text-sm text-red-500 flex flex-col items-start text-start">
            <ul>
              {state.error.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {state?.message && (
        <Alert variant="destructive">
          <div className="flex items-center gap-2 justify-center">
            <GoAlert className="h-4 w-4" />
            <p>{state?.message}</p>
          </div>
        </Alert>
      )}

      <SubmitButton />
    </form>
  );
};

export default RegisterForm;
