"use server";
import { get } from "@/utils/fetch";

export const getMangaChapterDetails = async (id: string) => {
  const res = await get(`manga/pages/${id}`);
  if (res.statusCode === 404) {
    throw new Error(`Failed to fetch manga chapters`);
  }

  return res;
};
