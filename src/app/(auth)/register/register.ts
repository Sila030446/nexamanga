"use server";
import API_URL from "@/common/constants/api";
import { FormState, SignupFormSchema } from "@/lib/type";

export default async function createUser(state: FormState, formData: FormData) {
  const validationFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(`${API_URL}/user`, {
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
        response.status === 422
          ? "อีเมลนี้มีอยู่ในระบบแล้ว"
          : response.statusText,
    };
}
