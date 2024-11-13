"use server";
import { get } from "@/utils/fetch";

export const getMangaChapterDetails = async (id: string) => {
  const res = await get(`manga/pages/${id}`);
  if (res.statusCode === 404) {
    return null;
  }

  return res;
};
