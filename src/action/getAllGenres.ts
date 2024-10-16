"use server";

import { get } from "@/utils/fetch";

export const getAllGenres = async () => {
  const res = await get("manga/genres");
  if (!res) {
    throw new Error(`Failed to fetch popular manga: ${res.statusText}`);
  }
  return res;
};
