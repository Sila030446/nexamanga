"use server";
import API_URL from "@/common/constants/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  AUTHENTICATION_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "./contexts/auth-cookie";

export default async function logout() {
  await fetch(`${API_URL}/auth/logout`, {
    headers: {
      Cookie: cookies().toString(),
    },
    method: "POST",
  });
  cookies().delete(AUTHENTICATION_COOKIE);
  cookies().delete(REFRESH_TOKEN_COOKIE);
  redirect("/");
}
