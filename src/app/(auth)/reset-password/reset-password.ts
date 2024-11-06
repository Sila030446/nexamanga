// app/(auth)/reset-password/reset-password.ts
"use server";
import API_URL from "@/common/constants/api";
import { FormState, ResetPasswordSchema } from "@/lib/type";

export default async function resetPassword(
  state: FormState,
  formData: FormData,
  hash: string
) {
  // Validate the form data first
  const validationFields = ResetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  // Validate hash is present
  if (!hash) {
    return {
      message: "Token ไม่ถูกต้อง",
    };
  }
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      hash: hash,
      password: validationFields.data.password,
      // Only send password, not confirmPassword to API
    }),
  });

  if (response.ok) {
    return {
      success: true,
    };
  }

  // Handle specific error cases
  if (response.status === 400) {
    return {
      message: "Token ไม่ถูกต้อง",
    };
  }

  // Handle other error statuses
  return {
    message:
      response.status === 404
        ? "ไม่พบข้อมูล"
        : "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
  };
}
