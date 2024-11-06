/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import API_URL from "@/common/constants/api";
import { getErrorMessage } from "@/utils/error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import {
  AUTHENTICATION_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "../contexts/auth-cookie";

export default async function login(_previous: any, formData: FormData) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const parsedRes = res;
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }

  setAuthCookie(res);
  redirect("/");
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
