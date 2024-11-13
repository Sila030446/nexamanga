"use server";
import API_URL from "@/common/constants/api";
import { FormState, ForgotPasswordSchema } from "@/lib/type";

export default async function forgotPassword(
  state: FormState,
  formData: FormData
) {
  const validationFields = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validationFields.data),
  });
  if (response.ok) {
    return {
      success: true,
    };
  } else
    return {
      message:
        response.status === 404
          ? "อีเมลนี้ไม่มีอยู่ในระบบ"
          : response.statusText,
    };
}
