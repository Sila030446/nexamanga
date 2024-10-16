"use server";
import { get } from "@/utils/fetch";
import { Profile } from "./profile.type";

export const fetchProfileData = async (): Promise<Profile> => {
  const res = await get("user/profile");

  if (!res) {
    console.log(`Failed to fetch profile`);
  }

  return res;
};
