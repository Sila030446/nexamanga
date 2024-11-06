"use client";

import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { PasswordInput } from "../ui/custom/PasswordInput";
import resetPassword from "@/app/(auth)/reset-password/reset-password";
import { FormState } from "@/lib/type";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ResetPasswordFormProps {
  hash: string;
}

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
        "ยืนยันรหัสผ่าน"
      )}
    </Button>
  );
};

const ResetPasswordForm = ({ hash }: ResetPasswordFormProps) => {
  const router = useRouter();
  const [state, formAction] = useFormState(
    (state: FormState, formData: FormData) =>
      resetPassword(state, formData, hash),
    { error: {} }
  );

  useEffect(() => {
    if (state?.message) {
      toast.error(state.message);
    }

    if (state?.success) {
      toast.success("รีเซ็ตรหัสผ่านสำเร็จ");
      router.push("/login");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="h-12">
        <PasswordInput placeholder="รหัสผ่าน" name="password" />
      </div>
      {state?.error?.password && (
        <div className="text-sm text-red-500 flex flex-col items-start text-start">
          <ul>
            {state.error.password.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="h-12">
        <PasswordInput placeholder="ยืนยันรหัสผ่าน" name="confirmPassword" />
      </div>
      {state?.error?.confirmPassword && (
        <p className="text-red-500 text-sm my-1">
          {state.error.confirmPassword}
        </p>
      )}
      <SubmitButton />
    </form>
  );
};

export default ResetPasswordForm;
