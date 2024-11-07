import { getComicByType } from "@/action/getComicByType";
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
import { redirect } from "next/navigation";
import React from "react";

interface CategoryTypeProps {
  params: {
    type: string;
    page: string;
  };
}

export async function generateMetadata({
  params,
}: {
  params: { type: string; page: string };
}): Promise<Metadata> {
  const fullName = `ประเภท - ${decodeURIComponent(params.type)}`;
  return {
    title: fullName,
    description: `อ่านการ์ตูน ${fullName} ออนไลน์ฟรี อัพเดทตอนใหม่ล่าสุด`,
  };
}

const CategoryType: React.FC<CategoryTypeProps> = async ({ params }) => {
  const Type = params.type.charAt(0).toUpperCase() + params.type.slice(1);
  const page = parseInt(params.page) || 1;
  const response = await getComicByType({ type: Type, page });

  const mangas = response.mangas;
  const totalPages = response.totalPages;

  if (mangas.length === 0) {
    redirect(`/`);
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
          <PaginationPrevious href={`/category/${params.type}/${page - 1}`} />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`/category/${params.type}/${i}`}
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
          <PaginationNext href={`/category/${params.type}/${page + 1}`} />
        </PaginationItem>
      );
    }

    return links;
  };

  return (
    <Card className="w-full p-5">
      <CardTitle className="space-y-4 flex flex-col justify-center">
        <h1>
          <span className="text-3xl">🎉</span>{" "}
          {params.type === "manhwa" ? "มังฮวาทั้งหมด" : ""}
          {params.type === "manhua" ? "มังฮวัวทั้งหมด" : ""}
          {params.type === "manga" ? "มังงะทั้งหมด" : ""}
        </h1>
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
