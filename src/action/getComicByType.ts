import { get } from "@/utils/fetch";

export const getComicByType = async ({
  type,
  page,
}: {
  type: string;
  page: number;
}) => {
  const res = await get(`manga/update/${type}?page=${page}&limit=12`);

  if (!res) {
    throw new Error(`Failed to fetch popular manga: ${res.statusText}`);
  }

  return res;
};
