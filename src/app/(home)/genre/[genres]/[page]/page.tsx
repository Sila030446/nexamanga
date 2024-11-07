import { getComicByGenre } from "@/action/getComicByGenre";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import MangaCard from "@/components/ui/mangaCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UpdateMangaTypes } from "@/types/updateManga.type";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Metadata } from "next";
import React from "react";

interface CategoryTypeProps {
  params: {
    genres: string;
    page: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { genres: string; page: string };
}): Promise<Metadata> {
  const fullName = `แนว - ${decodeURIComponent(params.genres)} | หน้า ${
    params.page
  }`;
  return {
    title: fullName,
    description: `อ่านการ์ตูน ${fullName} ออนไลน์ฟรี อัพเดทตอนใหม่ล่าสุด`,
  };
}

const CategoryType: React.FC<CategoryTypeProps> = async ({ params }) => {
  const Genre = params.genres.charAt(0).toUpperCase() + params.genres.slice(1);
  const page = parseInt(params.page) || 1;
  const response = await getComicByGenre({ genre: Genre, page });

  const mangas = response.mangas;
  const totalPages = response.totalPages;

  if (mangas.length === 0) {
    return <div>No mangas found</div>;
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
          <PaginationPrevious href={`/genre/${params.genres}/${page - 1}`} />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`/genre/${params.genres}/${i}`}
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
          <PaginationNext href={`/genre/${params.genres}/${page + 1}`} />
        </PaginationItem>
      );
    }

    return links;
  };
  const genre = decodeURIComponent(params.genres).toUpperCase();
  return (
    <Card className="w-full p-5">
      <CardTitle className="space-y-4 flex flex-col justify-center">
        <span>
          <span className="text-3xl">🎉</span> {genre}
        </span>
        <Separator />
      </CardTitle>

      <CardContent className="mt-4 p-0">
        <div className="manga-card grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {mangas.map((manga: UpdateMangaTypes) => (
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

export default CategoryType;
