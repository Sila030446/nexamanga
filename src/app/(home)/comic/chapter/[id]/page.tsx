import React from "react";
import { Metadata } from "next";
import { getMangaChapterDetails } from "./getMangaChapterDetails";
import { MangaChapter } from "@/types/mangaChapter.type";
import HeaderMenu from "@/components/ui/custom/HeaderMenuContent";
import Breadcrumbs from "@/components/ui/custom/Breadcrumbs";
import MangaChapterContent from "@/components/ui/custom/MangaChapterContent";
import ToTopButton from "@/components/ui/custom/ToTopButton";
import DisableDevTools from "@/components/ui/custom/DisableDevTools";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = params.id;
  const data: MangaChapter | null = await getMangaChapterDetails(id);

  if (!data || !data.currentChapter) {
    return {
      title: "Chapter Not Found",
      description: "The chapter you are looking for does not exist.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { currentChapter } = data;
  const { mangaManhwa, title: chapterTitle } = currentChapter;
  const { title: mangaTitle, description } = mangaManhwa;

  const fullTitle = `${mangaTitle} - ${chapterTitle}`;
  const fullDescription = `อ่าน ${chapterTitle} ของ ${mangaTitle}. ${
    description?.slice(0, 150) || ""
  }...`;

  const canonical = `https://nexamanga.online/comic/chapter/${id}`;

  return {
    title: fullTitle,
    description: fullDescription,
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: canonical,
      siteName: "nexamanga",
      type: "article",
      images: [
        {
          url:
            currentChapter.pages?.[0]?.imageUrl || "/default-manga-cover.jpg",
          width: 1200,
          height: 630,
          alt: `Cover image for ${mangaTitle}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [
        currentChapter.pages?.[0]?.imageUrl || "/default-manga-cover.jpg",
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const MangaChapterSchema = ({ data }: { data: MangaChapter }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${data.currentChapter?.title} - ${data.currentChapter?.mangaManhwa?.title}`,
    description: data.currentChapter?.mangaManhwa?.description || "",
    datePublished: data.currentChapter?.createdAt,
    dateModified: data.currentChapter?.updatedAt,
    author: {
      "@type": "Organization",
      name: "Nexamanga",
    },
    publisher: {
      "@type": "Organization",
      name: "Nexamanga",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://nexamanga.online/comic/chapter/${data.currentChapter?.id}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

const Page = async ({ params }: PageProps) => {
  const id = params.id;
  const data: MangaChapter | null = await getMangaChapterDetails(id);

  if (!data || !data.currentChapter) {
    return notFound();
  }

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
      <MangaChapterSchema data={data} />
      <div className="text-sm lg:text-base">
        <div className="min-h-screen">
          <main>
            <div className="max-w-4xl mx-auto bg-card rounded-sm">
              <div>
                <div className="pb-0 w-full">
                  <div className="flex flex-row justify-center w-full min-h-screen">
                    <div className="w-full">
                      <Breadcrumbs items={breadcrumbItems} />
                      <div className="w-full">
                        <div className="relative min-h-screen">
                          <HeaderMenu
                            allChapters={data.allChapters}
                            currentChapterTitle={data.currentChapter.title}
                            previousSlug={data.previousSlug}
                            nextSlug={data.nextSlug}
                          />
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

export default Page;
