import { getBookmarks } from "@/action/Bookmark";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import MangaCard from "@/components/ui/mangaCard";
import { UpdateMangaTypes } from "@/types/updateManga.type";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React from "react";

const CategoryType = async () => {
  try {
    const response = await getBookmarks();
    const mangas =
      response?.map(
        (bookmark: { mangaManhwa: UpdateMangaTypes }) => bookmark.mangaManhwa
      ) || [];

    console.log(mangas);

    return (
      <Card className="w-full p-5">
        <CardTitle className="space-y-4 flex flex-col justify-center">
          Bookmarks
          <Separator />
        </CardTitle>

        <CardContent className="mt-4 p-0">
          <div className="manga-card grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {mangas.map((manga: UpdateMangaTypes) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return <div>Error loading bookmarks.</div>;
  }
};

export default CategoryType;
