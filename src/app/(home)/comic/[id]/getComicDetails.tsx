"use server";

import { get } from "@/utils/fetch";

export const getComicDetails = async (id: string) => {
  const res = await get(`manga/${id}`);
  if (res.statusCode === 404) {
    return null;
  }

  return res;
};
