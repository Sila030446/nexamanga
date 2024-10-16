"use server";

import { get } from "@/utils/fetch";

export const getComicDetails = async (id: string) => {
  const res = await get(`manga/${id}`);
  if (!res) {
    throw new Error(`Failed to fetch manga`);
  }

  return res;
};
