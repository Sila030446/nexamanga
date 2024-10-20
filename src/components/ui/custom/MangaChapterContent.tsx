"use client";
import React from "react";
import { CurrentChapter } from "@/types/mangaChapter.type";
import Image from "next/image";

interface MangaChapterContentProps {
  chapter: CurrentChapter;
}

const MangaChapterContent: React.FC<MangaChapterContentProps> = ({
  chapter,
}) => {
  if (!chapter.pages) {
    return <div>Chapter not found</div>;
  }
  return (
    <div>
      <div className="flex flex-col pt-[64px] pb-4 px-4 md:pt-[82px] md:px-8 md:pb-8 lg:pt-16 lg:px-16 lg:pb-0">
        <p className="text-center break-words text-2xl font-bold">
          {chapter.title}
        </p>
      </div>
      <div className="border-b">
        <div>
          <div className="py-4 md:py-8 lg:py-16">
            <div className="w-full h-full max-w-4xl flex flex-col">
              {chapter.pages.map((page) => (
                <div key={page.pageNumber} className="w-full">
                  <Image
                    src={page.imageUrl}
                    alt={`Page ${page.pageNumber}`}
                    width={896}
                    height={1000}
                    quality={100}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaChapterContent;
