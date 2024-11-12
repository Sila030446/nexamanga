import Link from "next/link";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { UpdateMangaTypes } from "@/types/updateManga.type";

// Function to format the date
export const timeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) {
    return `${diff} วินาที`;
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} นาที`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} ชั่วโมง`;
  } else if (diff < month) {
    const days = Math.floor(diff / day);
    return `${days} วันที่`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months} เดือน`;
  } else {
    const years = Math.floor(diff / year);
    return `${years} ปี`;
  }
};

interface MangaCardProps {
  manga: UpdateMangaTypes;
}

const MangaCard: React.FC<MangaCardProps> = ({ manga }) => {
  return (
    <div className="p-0">
      <Card className="p-2 flex flex-col items-center gap-2">
        <div className="w-full h-[280px] relative ">
          <Link href={`/comic/${manga.id}`}>
            <Image
              src={manga.coverImageUrl}
              alt={manga.title}
              unoptimized
              className="w-full h-full object-cover hover:scale-105 transition-all"
            />
          </Link>
          {manga.type.map((type) => (
            <Badge
              key={type.id}
              variant={"destructive"}
              className={`absolute top-2 right-2 ${
                type.name === "Manhua" ? "bg-blue-500 hover:bg-blue-600" : ""
              } ${
                type.name === "Manga" ? "bg-yellow-500 hover:bg-yellow-600" : ""
              }`}
            >
              {type.name}
            </Badge>
          ))}
        </div>
        <div className="w-full ">
          <Link
            href={`/comic/${manga.id}`}
            className="hover:text-yellow-500 transition-all"
          >
            <p className="line-clamp-1 text-center">{manga.title}</p>
          </Link>
        </div>
        <div className="w-full flex flex-col gap-y-1">
          {manga.chapters.map((chapter) => (
            <Link key={chapter.id} href={`/comic/chapter/${chapter.slug}`}>
              <Button
                size={"sm"}
                variant={"outline"}
                className="w-full text-start flex items-center justify-between"
              >
                <p>{chapter.title}</p>
                <p>{timeAgo(chapter.createdAt)}</p>
              </Button>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MangaCard;
