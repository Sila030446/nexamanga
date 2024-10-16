import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import MangaCard from "../ui/mangaCard";
import { Separator } from "../ui/separator";
import getUpdateManga from "@/action/getUpdateManga";
import { UpdateMangaTypes } from "@/types/updateManga.type";

// Server component
const UpdateManga = async ({
  searchParams = {},
}: {
  searchParams?: { page?: string; limit?: string };
}) => {
  const page = parseInt(searchParams?.page || "1", 10); // Default to page 1
  // Default to limit of 12 per page

  const { mangas }: { mangas: UpdateMangaTypes[] } = await getUpdateManga({
    page,
  });

  if (!mangas || mangas.length === 0) {
    return <div>No data</div>;
  }

  return (
    <Card className="w-full p-5">
      <CardTitle className="space-y-4 flex flex-col justify-center">
        <p>
          <span className="text-3xl">🎉</span>
          มังะอัพเดทใหม่
        </p>
        <Separator />
      </CardTitle>

      <CardContent className="mt-4 p-0">
        <div className="manga-card grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {mangas.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
        <div className="flex w-full justify-end mt-4">
          <Link href={`/page/2`}>
            <Button variant="link">ดูทั้งหมด</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateManga;
