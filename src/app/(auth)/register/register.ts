/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { postRegister } from "@/utils/fetch";

export default async function createUser(_prevState: any, formData: FormData) {
  const { error } = await postRegister({
    path: "user",
    formData,
    errorOptions: true,
  });
  if (error) {
    console.log(error);
    return { error };
  }
  return;
}
