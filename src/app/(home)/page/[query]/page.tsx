import getUpdateManga from "@/action/getUpdateManga";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import MangaCard from "@/components/ui/mangaCard";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Page = async ({ params }: { params: { query: string } }) => {
  const page = parseInt(params.query) || 1;
  const response = await getUpdateManga({ page });

  const mangas = response.mangas;
  const totalPages = response.totalPages;

  if (!Array.isArray(mangas)) {
    return (
      <Card className="w-full p-5">
        <CardContent>
          <p>
            Error: Expected an array of mangas, but received:{" "}
            {JSON.stringify(mangas)}
          </p>
        </CardContent>
      </Card>
    );
  }

  const generatePaginationLinks = () => {
    const links = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage === totalPages && endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (page > 1) {
      links.push(
        <PaginationItem key="prev">
          <PaginationPrevious href={`/page/${page - 1}`} />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`/page/${i}`}
            className={i === page ? "bg-blue-500 text-white" : ""}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (page < totalPages) {
      links.push(
        <PaginationItem key="next">
          <PaginationNext href={`/page/${page + 1}`} />
        </PaginationItem>
      );
    }

    return links;
  };

  return (
    <Card className="w-full p-5">
      <CardTitle className="space-y-4 flex flex-col justify-center">
        <p>
          <span className="text-3xl">🎉</span> มังะอัพเดทใหม่
        </p>
        <Separator />
      </CardTitle>

      <CardContent className="mt-4 p-0">
        <div className="manga-card grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {mangas.map((manga) => (
            <MangaCard key={manga.id} manga={manga} />
          ))}
        </div>
      </CardContent>

      <Pagination className="mt-4">
        <PaginationContent>{generatePaginationLinks()}</PaginationContent>
      </Pagination>
    </Card>
  );
};

export default Page;
