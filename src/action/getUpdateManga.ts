"use server";

import { get } from "@/utils/fetch";

export const getUpdateManga = async ({ page }: { page: number }) => {
  // Fetch manga update data with page and limit as query parameters
  const res = await get(`manga/update?page=${page}&limit=12`);

  return res;
};

export default getUpdateManga;
