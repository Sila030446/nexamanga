import { getAllGenres } from "@/action/getAllGenres";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import Link from "next/link";

const AllGenres = async () => {
  const genres = await getAllGenres();
  return (
    <Card className="w-full p-5">
      <CardTitle className="space-y-4 flex flex-col justify-center">
        <p>
          <span className="text-3xl">📚</span>
          หมวดหมู่ทั้งหมด
        </p>
        <Separator />
      </CardTitle>

      <CardContent className="mt-4 p-0">
        <div className="manga-card grid grid-cols-2 gap-2">
          {genres.map((genre: { id: number; name: string; slug: string }) => (
            <Link
              key={genre.id}
              className="hover:underline"
              href={`/genre/${genre.slug}`}
            >
              <div>
                <p className="text-base line-clamp-1">{genre.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllGenres;
