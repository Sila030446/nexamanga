/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { getComicDetails } from "./getComicDetails";
import { Author, MangaManhwa } from "../types/comicDetail.type";
import Image from "next/image";
import Link from "next/link";
import { GoListUnordered } from "react-icons/go";
import { FaRegEye, FaRegHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import RatingStar from "@/components/ui/ratingStar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BookmarkButton from "@/components/ui/custom/BookmarkButton";
import { SlashIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const manga = await getComicDetails(params.id);

  if (!manga) {
    return {
      title: "Comic Not Found",
      description: "The requested comic could not be found.",
    };
  }

  const genres = manga.genres?.map((genre: Author) => genre.name).join(", ") || "";

  return {
    title: `${manga.title} - อ่านการ์ตูนออนไลน์`,
    description: manga.description?.slice(0, 160) || `อ่าน ${manga.title} ออนไลน์ฟรี อัพเดทตอนใหม่ล่าสุด`,
    keywords: [manga.title, manga.alternativeTitle, ...manga.genres?.map((g: Author) => g.name) || [], "มังงะ", "การ์ตูน", "อ่านการ์ตูน"],
    openGraph: {
      title: manga.title,
      description: manga.description?.slice(0, 160),
      images: [
        {
          url: manga.coverImageUrl,
          width: 1200,
          height: 630,
          alt: manga.title,
        },
      ],
      type: "article",
    },
    alternates: {
      canonical: `https://nexamanga.online/comic/${manga.id}`,
    },
  };
}

const ComicPage = async ({ params }: { params: { id: string } }) => {
  const manga: MangaManhwa | null = await getComicDetails(params.id);

  if (!manga) {
    return redirect("/404_not_found");
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: manga.title,
    alternateName: manga.alternativeTitle,
    image: manga.coverImageUrl,
    description: manga.description,
    author: Array.isArray(manga.authors)
      ? manga.authors.map((author: Author) => ({ "@type": "Person", name: author.name }))
      : { "@type": "Person", name: manga.authors || "Unknown" },
    publisher: { "@type": "Organization", name: "Nexamanga" },
    genre: manga.genres?.map((genre) => genre.name).join(", ") || "",
    datePublished: manga.chapters?.[manga.chapters.length - 1]?.createdAt || "",
    dateModified: manga.chapters?.[0]?.createdAt || "",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: manga.avgRating || 0,
      ratingCount: manga.ratings?.length || 0,
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="flex flex-col gap-4 mt-2">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">หน้าแรก</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/page/1">ทั้งหมด</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/comic/${manga.id}`}>{manga.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div>
          <h1 className="font-bold text-xl lg:text-[1.75rem] md:pb-2 line-clamp-2">
            {manga.title}
          </h1>
          <h2 className="text-sm text-muted-foreground line-clamp-1 md:line-clamp-2">
            {manga.alternativeTitle}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center mt-2 md:space-x-6 space-y-3">
          <div className="flex flex-col justify-center items-center w-full md:w-fit">
            <div className="relative h-[19.625rem] w-56">
              <Image
                src={manga.coverImageUrl}
                alt={manga.title}
                layout="fill"
                className="object-cover rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-grow flex-col justify-between">
            <div className="flex flex-col">
              <div className="flex md:flex-row flex-wrap gap-x-1 gap-y-1 items-center justify-center md:justify-start">
                {manga.genres?.map((genre) => (
                  <Link key={genre.id} href={`/genre/${genre.slug}`}>
                    <div className="bg-primary rounded-full px-2 py-1 text-xs font-bold line-clamp-1 hover:bg-rose-700 transition-all">
                      {genre.name}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-2 md:mt-4 flex flex-row space-x-4 font-medium text-muted-foreground">
                <div className="flex flex-row items-center gap-1">
                  <GoListUnordered className="w-5 h-5" />
                  <span>{manga.chapters?.length || 0}</span>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <FaRegEye className="w-5 h-5" />
                  <span>{manga.viewCount}</span>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <FaRegHeart className="w-5 h-5" />
                  <span>{manga.ratings?.length || 0}</span>
                </div>
              </div>

              <div className="mt-2 md:mt-4 text-muted-foreground font-light leading-6 lg:leading-7">
                <p className="break-words">{manga.description}</p>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <RatingStar initialRating={manga.avgRating} />
                <span className="text-sm text-muted-foreground">
                  {manga.avgRating}
                </span>
              </div>
            </div>

            <div>
              <hr className="border-primary-foreground mt-8" />
              <div className="mt-4 flex flex-col-reverse md:flex-row gap-1 md:gap-2">
                <div>
                  <BookmarkButton mangaManhwaId={manga.id} className="w-full" />
                </div>

                <div className="w-full md:w-auto flex flex-row gap-1 items-center justify-between md:justify-start">
                  {manga.chapters?.length > 0 && (
                    <>
                      <Link
                        href={`/comic/chapter/${
                          manga.chapters[manga.chapters.length - 1].slug
                        }`}
                        className="btn btn-primary w-full md:w-auto"
                      >
                        <Button
                          variant={"outline"}
                          size="lg"
                          className="w-full"
                        >
                          เริ่มอ่าน
                        </Button>
                      </Link>

                      <Link
                        href={`/comic/chapter/${manga.chapters[0].slug}`}
                        className="btn btn-primary w-full md:w-auto"
                      >
                        <Button
                          variant={"outline"}
                          size="lg"
                          className="w-full"
                        >
                          ตอนล่าสุด
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[80%] max-h-[500px] mt-4 md:mt-8 flex flex-col gap-4 overflow-y-auto">
          {manga.chapters?.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/comic/chapter/${chapter.slug}`}
              className="text-sm md:text-base"
            >
              <Button
                variant={"outline"}
                size="lg"
                className="w-full justify-between"
              >
                {chapter.title}
                <span className="text-xs md:text-sm text-muted-foreground">
                  {new Date(chapter.createdAt).toLocaleDateString("th-TH")}
                </span>
              </Button>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default ComicPage;
