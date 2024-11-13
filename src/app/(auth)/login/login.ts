"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import API_URL from "@/common/constants/api";
import { FormState, LoginFormSchema } from "@/lib/type";
import {
  AUTHENTICATION_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "../contexts/auth-cookie";

export async function login(prevState: FormState, formData: FormData) {
  // 1. Validate form data
  const validationResult = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // 2. Return validation errors if any
  if (!validationResult.success) {
    const formatted = validationResult.error.format();
    return {
      error: {
        email: formatted.email?._errors,
        password: formatted.password?._errors,
      },
    } as FormState;
  }

  // 3. Make API request
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validationResult.data),
    });

    if (!res.ok) {
      return {
        message:
          res.status === 401 || res.status === 404
            ? "อีเมลนี้หรือรหัสผ่านไม่ถูกต้อง"
            : "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
      } as FormState;
    }

    // 4. Set cookies on successful login
    setAuthCookie(res);
    return { success: true } as FormState;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      message: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
    } as FormState;
  }
}

export const setAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    cookies().set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      secure: true,
      httpOnly: true,
      sameSite: "none",
      path: "/",
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
    cookies().set({
      name: REFRESH_TOKEN_COOKIE,
      value: token,
      secure: true,
      httpOnly: true,
      sameSite: "none",
      path: "/",
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};
