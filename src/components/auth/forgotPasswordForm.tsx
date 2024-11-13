"use client";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoMdMail } from "react-icons/io";
import { useFormState, useFormStatus } from "react-dom";
import forgotPassword from "@/app/(auth)/forgot-password/forgot-password";
import { Loader2 } from "lucide-react";
import { Alert } from "../ui/alert";
import { GoAlert } from "react-icons/go";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      className="w-full bg-emerald-500 text-white px-4 py-2 text-base transition-all duration-300 ease-in-out transform hover:bg-emerald-600 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
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
        "ส่งอีเมล"
      )}
    </Button>
  );
};

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const [state, formAction] = useFormState(forgotPassword, { error: {} });

  // Handle success notification and redirection
  useEffect(() => {
    if (state?.success) {
      toast.success("ส่งอีเมลสําเร็จ");
      router.push("/login");
    }
  }, [state?.success, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 items-start ">
        <div className="relative w-full h-12">
          <IoMdMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <Input
            className="w-full h-full pl-10 pr-4 py-2 text-md rounded border border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 transition-colors"
            type="email"
            name="email"
            placeholder="อีเมล"
          />
        </div>
        {state?.error?.email && (
          <p className="text-red-500 text-sm my-1">{state.error.email}</p>
        )}
      </div>

      {state?.message && (
        <Alert variant="destructive" className="p-4">
          <div className="flex items-center gap-2">
            <GoAlert className="h-4 w-4 text-red-600" />
            <p className="text-red-700">{state.message}</p>
          </div>
        </Alert>
      )}

      <SubmitButton />
    </form>
  );
};
