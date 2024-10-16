// Your existing page file
import React from "react";
import { getMangaChapterDetails } from "./getMangaChapterDetails";
import { MangaChapter } from "@/types/mangaChapter.type";
import HeaderMenu from "@/components/ui/custom/HeaderMenuContent";
import Breadcrumbs from "@/components/ui/custom/Breadcrumbs";
import MangaChapterContent from "@/components/ui/custom/MangaChapterContent";
import ToTopButton from "@/components/ui/custom/ToTopButton";
import DisableDevTools from "@/components/ui/custom/DisableDevTools";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const id = params.id;
  const data: MangaChapter = await getMangaChapterDetails(id);
  const breadcrumbItems = [
    { label: "หน้าแรก", href: "/" },
    { label: "ทั้งหมด", href: "/page/1" },
    {
      label: data.currentChapter.mangaManhwa.title,
      href: `/comic/${data.currentChapter.mangaManhwa.id}`,
    },
    {
      label: data.currentChapter.title,
      href: `/comic/chapter/${data.currentChapter.id}`,
    },
  ];

  return (
    <>
      {process.env.NODE_ENV === "production" && <DisableDevTools />}
      <div className="text-sm lg:text-base">
        <div className="min-h-screen">
          <main>
            <div className="max-w-4xl mx-auto bg-card rounded-sm">
              <div>
                <div className="pb-0 w-full">
                  <div className="flex flex-row justify-center w-full min-h-screen">
                    <div className="w-full">
                      {/* Breadcrumb */}
                      <Breadcrumbs items={breadcrumbItems} />
                      {/* Content */}
                      <div className="w-full">
                        <div className="relative min-h-screen">
                          {/* Header Menu Content */}
                          <HeaderMenu
                            allChapters={data.allChapters}
                            currentChapterTitle={data.currentChapter.title}
                            previousSlug={data.previousSlug}
                            nextSlug={data.nextSlug}
                          />
                          {/* Page Content */}
                          <MangaChapterContent chapter={data.currentChapter} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ToTopButton />
    </>
  );
};

export default page;
