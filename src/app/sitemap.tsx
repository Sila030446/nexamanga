import { MetadataRoute } from "next";
import { getAllGenres } from "@/action/getAllGenres";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let genreEntries: MetadataRoute.Sitemap = [];

  // Attempt to fetch genres and handle errors
  try {
    const genres = await getAllGenres();
    genreEntries = genres.map(
      (genre: { id: number; name: string; slug: string }) => ({
        url: `${process.env.API_URL}/genre/${encodeURIComponent(genre.name)}`,
      })
    );
  } catch (error) {
    console.error("Error fetching genres data:", error);
  }

  let mangaEntries: MetadataRoute.Sitemap = [];
  try {
    const response = await fetch(`${process.env.API_URL}/manga/all-mangas`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Prevent caching to get fresh data
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
        cache: "no-store", // Prevent caching to get fresh data
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
