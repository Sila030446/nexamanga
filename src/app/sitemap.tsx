import { getAllGenres } from "@/action/getAllGenres";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const genres = await getAllGenres();

  const genreEntries: MetadataRoute.Sitemap = genres.map(
    (genre: { id: number; name: string; slug: string }) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/genre/${encodeURIComponent(
        genre.name
      )}`,
    })
  );

  let mangaEntries: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch(`${process.env.API_URL}/manga/all-mangas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const mangaData = await response.json();
    mangaEntries = mangaData.map((manga: { id: number }) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/comic/${manga.id}`,
    }));
  } catch (error) {
    console.error("Error fetching manga data:", error);
  }

  let allChaptersSlugEntries: MetadataRoute.Sitemap = [];
  try {
    const allChaptersSlug = await fetch(
      `${process.env.API_URL}/manga/all-chapters-slug`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const allChaptersSlugData = await allChaptersSlug.json();
    allChaptersSlugEntries = allChaptersSlugData.map(
      (slugs: { slug: string }) => ({
        url: `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/comic/chapter/${encodeURIComponent(slugs.slug)}`,
      })
    );
  } catch (error) {
    console.error("Error fetching chapters slug data:", error);
  }

  return [
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/category/manhwa` },
    ...genreEntries,
    ...mangaEntries,
    ...allChaptersSlugEntries,
  ];
}
