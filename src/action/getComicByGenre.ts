import { get } from "@/utils/fetch";

export const getComicByGenre = async ({
  genre,
  page,
}: {
  genre: string;
  page: number;
}) => {
  const res = await get(`manga/genre/${genre}?page=${page}&limit=12`);

  if (!res) {
    throw new Error(`Failed to fetch popular manga: ${res.statusText}`);
  }

  return res;
};
